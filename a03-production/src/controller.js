const express = require('express')
const github = require('octonode')
var router = express.Router()

class Controller {
  constructor () {
        var client = github.client('40165da773b862e2313879dde3bf9a6a26f81fff')
    var ghrepo = client.repo('np222gb/np222gb_1DV600')
    router.get('/',   async function (req, res) {
      /* issues are fetched and handlebars used to render data*/
           var issues =  await ghrepo.issues(function(err, data, headers) {
        res.render('issues', {issues: data})
      })
    })
}
}

module.exports = new Controller()
module.exports = router
