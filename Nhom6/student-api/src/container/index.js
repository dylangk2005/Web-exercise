const Student = require("../models/Student");
const StudentService = require("../services/student.service");
const StudentController = require("../controllers/student.controller");

const service = new StudentService(Student);
const controller = new StudentController(service);

module.exports = { controller };