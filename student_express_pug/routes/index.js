const { OngoingCourse, CompletedCourse } = require('../course');
const Student = require('../student');


var express = require('express');
var router = express.Router();

var math = new OngoingCourse(1, 'Math', 'STEM', 'Just a math course', 12);
var tech = new OngoingCourse(2, 'Tech', 'STEM', 'Just a tech course', 12);
var engineering = new OngoingCourse(3, 'Engineering', 'STEM', 'Just an engineering course', 0);
var science = new OngoingCourse(4, 'Science', 'STEM', 'Just a math course', 12);
var chemistry = new OngoingCourse(5, 'Chemistry', 'STEM', 'Just a chemistry course', 0);

allOngoing = [math, tech, engineering, science, chemistry]

allStudents = [
  new Student(10, "Tertius Erskine", "STEM", 3,
    [science, chemistry],
    [
      new CompletedCourse(6, 'Psychology', 'Sciences', "Just a psychology course", 95),
      new CompletedCourse(7, 'Kinesiology', 'Sciences', "Just a kinesiology course", 90)
    ]),
  new Student(11, "John Doe", "STEM", 2,
    [science, tech],
    [
      new CompletedCourse(8, 'Data Science', 'STEM', "Just a data science course", 92),
      new CompletedCourse(9, 'Algorithms', 'STEM', "Just an algorithms course", 84)
    ]),
  new Student(12, "Ezekiel Erskine", "STEM", 1,
    [science, tech],
    [
      new CompletedCourse(10, 'Web Technologes', 'STEM', "Just a web development course", 97),
      new CompletedCourse(11, 'System Design', 'STEM', "Just a system design course", 94)
    ])
]


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Students and Courses' });
});

router.get('/students', function (req, res, next) {
  res.render('students');
});

router.get('/ongoing', function (req, res, next) {
  res.render('ongoing');
});

router.get('/average/:studentId', function (req, res, next) {
  s_id = req.params.studentId;
  output = "There is no student with that student id"
  let student = allStudents.find(element => element.id === parseInt(s_id))
  if (student) {
    output = `Student ID: ${student.id} Name: ${student.name} Average: ${student.average()}`
  }
  res.render('average', { out: output });
});

router.get('/filterongoing', function (req, res, next) {
  res.render('filterongoing');
});

router.post('/filterongoing', function (req, res, next) {
  let id = req.body.id;
  let name = req.body.name
  let dept = req.body.dept
  let remain = req.body.remain ? true : false
  let ongoing = allOngoing;
  if (id) {
    ongoing = allOngoing.filter(element => parseInt(element.id) === parseInt(id))
  }
  else if (name) {
    ongoing = allOngoing.filter(element => element.name.toLowerCase() === name.toLowerCase())
  }
  else if (dept) {
    ongoing = allOngoing.filter(element => element.dept.toLowerCase() === dept.toLowerCase())
  }

  if (remain) {
    ongoing = ongoing.filter(element => parseInt(element.remaining) > 0)
  }
  else {
    ongoing = ongoing.filter(element => parseInt(element.remaining) === 0)
  }
  res.render('filterongoingrender', { ongoing: ongoing });
});

router.get('/filterstudent', function (req, res, next) {
  res.render('filterstudent');
});

router.post('/filterstudent', function (req, res, next) {
  let id = req.body.s_id
  let name = req.body.name
  let dept = req.body.dept
  let enrolled = req.body.enrolled
  let completed = req.body.completed
  let student = allStudents
  if (id) {
    student = allStudents.filter(element => parseInt(element.id) === parseInt(id))
  }
  else if (name) {
    student = allStudents.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
  }
  else if (dept) {
    student = allStudents.filter(element => element.dept.toLowerCase() === dept.toLowerCase())
  }
  else if (enrolled) {
    student = []
    allStudents.forEach(element => {
      element.courses_enrolled.forEach(course => {
        if (course.name.toLowerCase() === enrolled.toLowerCase()) {
          student.push(element)
        }

      })
    })
  }
  else if (completed) {
    student = []
    allStudents.forEach(element => {
      element.courses_completed.forEach(course => {
        if (course.name.toLowerCase() === completed.toLowerCase()) {
          student.push(element)
        }
      })
    })
  }

  res.render('filterstudentrender', { student: student });
});

module.exports = router;
