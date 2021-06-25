const express = require('express')
const expresshbs= require('express-handlebars')
const bodyparser = require('body-parser')
const path = require('path')
const GithubWebHook = require('express-github-webhook')

var webhookHandler = GithubWebHook({ path: '/', secret: 'nitin' });
const app = express()
const port =  5001
const http = app.listen(port, () => console.log(`Server running on port ${port}`))

const io = require("socket.io")(http)
const handlebars = expresshbs.create({
  defaultLayout: 'homepage',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
  partialsDir: path.resolve(__dirname, 'views/partials')
})
/** For the assignment GitHub is used to fetch the issues.
 * Github Webhook package is used to receive real-time 
 * notifications about the changes made 
*/
app.use(bodyparser.json())
app.use(webhookHandler)
app.use(express.static(path.resolve(__dirname, 'public')))
app.set('views', path.resolve(__dirname, 'views'))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

io.on('connection', (socket) => {
  console.log('New Client(s) is connected!')
  socket.on('disconnect', () => {
    console.log(' Client(s) disconnected!')
  })
})

webhookHandler.on('*', function (event, repo, data) {
  io.emit('issue',data)
});
app.use('/', require(path.resolve(__dirname, 'controller.js')))

app.get('/error', (req, res) => {
  process.exit(1)
})
