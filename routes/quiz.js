const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', function (req, res) {
  const show = !req.session.vote

  Quiz.find({}, (err, data) => {
    // console.log(data)

    let sum = 0
    data.forEach(item => {
      sum += item.vote
    })

    res.render('quiz', { title: 'Quiz', data, show, sum })
  })

  //   new Quiz({ title: 'Question 1', vote: 0 }).save()
})

router.post('/', (req, res) => {
  const id = req.body.quiz

  Quiz.findOne({ _id: id }, (err, data) => {
    data.vote = data.vote + 1

    data.save(err => {
      req.session.vote = 1

      res.redirect('/quiz')
      console.log(data)
    })
  })

  //   new Quiz({ title: 'Question 1', vote: 0 }).save()
})
module.exports = router