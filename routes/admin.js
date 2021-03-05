var express = require('express')
const News = require('../models/news')
var router = express.Router()

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login')

    return
  }
  next()
})

/* GET home page. */
router.get('/', function (req, res) {
  News.find({}, (err, data) => {
    // console.log(data)

    res.render('admin/index', { title: 'Admin', data })
  })
})

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Add news', body: {}, errors: {} })
})

router.post('/news/add', (req, res) => {
  const body = req.body

  const newsData = new News(body)
  const errors = newsData.validateSync()

  // console.log(errors)

  newsData.save(err => {
    if (err) {
      res.render('admin/news-form', {
        title: 'Add news',
        errors,
        body
      })
    }
    res.redirect('/admin')
  })
})

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, err => {
    res.redirect('/admin')
  })
})

module.exports = router
