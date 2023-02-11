const bcrypt = require('bcryptjs');
const employeeRouter = require('express').Router();
const Employee = require('../models/employee');

employeeRouter.get('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const employees = await Employee.find({});

  return response.json(employees);
});

employeeRouter.get('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.id === request.params.id || request.accessLevel === 1) {
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
  if (request.accessLevel === 1) {
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

  if (request.accessLevel === 1) {
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

employeeRouter.patch('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const { email, newPassword } = request.body;
  if (!email) {
    return response.status(400).json({ error: 'Email not provided' });
  }
  const employee = await Employee.findOne({ email });
  if (employee.id !== request.params.id) {
    return response.status(400).json({ error: 'Email doesnot match with user' });
  }
  if (request.accessLevel === 1 && email) {
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    employee.passwordHash = newPasswordHash;
    const updatedPassword = await employee.save();
    return response.status(200).json(updatedPassword);
  }

  return response
    .status(403)
    .json({ error: `Don't have permission to update a employee details` })
    .end();
});

employeeRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.accessLevel === 1) {
    const deletedEmployee = await Employee.findByIdAndRemove(request.params.id);
    if (!deletedEmployee) {
      return response.status(404).end();
    }

    return response.status(204).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete a new employee` })
    .end();
});

module.exports = employeeRouter;
