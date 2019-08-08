const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let courses = require('./data/courses.json');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public' ));
app.use(express.static( __dirname + '/node_modules/bootstrap/dist' ));

app.get('/', (req, res) => {
  res.render('index', {title: 'API'});
});

app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Api Курсы',
    courses: courses
  });
});

app.get('/courses/add', (req, res) => {
  res.render('add');
});

app.post('/courses/add', (req, res) => {
  let course = {
    name: req.body.name,
    id: Date.now()
  };

  courses.push(course);

  res.redirect('/courses');
});

app.get('/courses/edit/:id', (req, res) => {
  let course = courses.find( (course) => {
    return course.id === parseInt(req.params.id);
  })

  if(!course) {
    res.sendStatus(404);
    return;
  }

  res.render('edit', { course: course });
});


app.post('/courses/edit/:id', (req, res) => {
  let course = courses.find( (course) => {
    return course.id === parseInt(req.params.id);
  })

  if(!course) {
    res.sendStatus(404);
    return;
  }

  course.name = req.body.name;

  res.redirect('/courses');
});

app.get('/courses/delete/:id', (req, res) => {
  courses = courses.filter( (course) => {
    return course.id !== parseInt(req.params.id);
  })

  res.redirect('/courses');
});

app.listen(3000, () => {
  console.log('app listening at localhost:3000');
})