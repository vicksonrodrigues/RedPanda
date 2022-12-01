const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const Employee = require('../../models/employee');

const sampleEmployee = [
  {
    firstName: 'adminfirst',
    lastName: 'adminlast',
    email: 'adminfirst@gmail.com',
    phone: '8974561230',
    department: 'admin',
    position: 'project lead',
    accessLevel: 1,
    password: '123456789xyz',
  },
  {
    firstName: 'secondAdminFirst',
    lastName: 'secondAdminLast',
    email: 'adminSecond@gmail.com',
    phone: '8997546232',
    department: 'admin',
    position: 'project lead',
    accessLevel: 2,
    password: '123456789abc',
  },
];

const initalEmployee = async (employees) => {
  await Promise.all(
    employees.map(async (employee) => {
      const { firstName, lastName, email, phone, password, department, accessLevel, position } =
        employee;
      const passwordHash = await bcrypt.hash(password, 10);
      const newEmployee = new Employee({
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        department,
        accessLevel,
        position,
      });
      await newEmployee.save();
    }),
  );
};

const employeeToken = async (email, password) => {
  const employee = await Employee.findOne({ email });
  const passwordCorrect =
    employee === null ? false : await bcrypt.compare(password, employee.passwordHash);
  if (!(employee && passwordCorrect)) {
    return null;
  }
  const customerForToken = {
    email: employee.email,
    id: employee._id,
    belong: 'employee',
  };
  const token = jwt.sign(customerForToken, config.SECRET);
  return token;
};

const employeeInDb = async () => {
  const employees = await Employee.find({});
  return employees.map((employee) => employee.toJSON()); // (.toJSON) used for removing _id,__v,passwordHash
};

const nonExistingId = async () => {
  const passwordHash = await bcrypt.hash('123456789dfg', 10);
  const employee = new Employee({
    firstName: 'removefirst',
    lastName: 'removelast',
    email: 'removefirst.removelast@gmail.com',
    phone: '9876543210',
    passwordHash,
    department: 'kitchen',
    position: 'chef',
    accessLevel: 2,
  });
  await employee.save();
  await employee.remove();
  return employee._id.toString();
};
module.exports = {
  sampleEmployee,
  initalEmployee,
  employeeToken,
  employeeInDb,
  nonExistingId,
};
