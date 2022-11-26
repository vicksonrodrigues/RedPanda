const bcrypt = require('bcryptjs');
const employeeRouter = require('express').Router();
const Employee = require('../models/employee');

employeeRouter.get('/', async (request, response) => {
  const employees = await Employee.find({});

  response.json(employees);
});

employeeRouter.get('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.id === request.params.id || request.employee.accessLevel === 1) {
    const employee = await Employee.findById(request.params.id);
    if (employee) {
      return response.json(employee);
    }
    return response.status(404).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access this employee details` })
    .end();
});

employeeRouter.post('/', async (request, response) => {
  const { firstName, lastName, phone, email, password, department, position, accessLevel } =
    request.body;
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    return response.status(400).json({
      error: `employee's email must be unique`,
    });
  }
  if (request.employee.accessLevel === 1) {
    const passwordHash = await bcrypt.hash(password, 10);

    const employee = new Employee({
      firstName,
      lastName,
      phone,
      email,
      passwordHash,
      department,
      position,
      accessLevel,
    });
    const savedEmployee = await employee.save();

    return response.status(201).json(savedEmployee);
  }
  return response.status(403).json({ error: `Don't have permission to add a new employee` }).end();
});

employeeRouter.put('/:id', async (request, response) => {
  const { phone, department, position, accessLevel } = request.body;
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (request.employee.accessLevel === 1) {
    const modifiedEmployee = {
      phone,
      department,
      position,
      accessLevel,
    };
    const updatedEmployee = await Employee.findByIdAndUpdate(request.params.id, modifiedEmployee, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    return response.json(updatedEmployee);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to update a new employee` })
    .end();
});

module.exports = employeeRouter;
