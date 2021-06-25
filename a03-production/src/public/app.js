// const io = require("socket.io-client");

//use any one of the two socket io.connect functions
const socket = io.connect("http://localhost:5001",  { transports: ['websocket'] }) // runs locally
// const socket = io.connect('https://cscloud8-91.lnu.se/a03-production/')    // runs on my production server 

socket.on("issue", (data) => {
  console.log("New Client(s) is connected");
    var list_li= document.createElement('li')
    list_li.id= data.action
    var handlebar_template= document.querySelector('template').content.cloneNode(true)
    var img_issue = handlebar_template.querySelector('.user-image').querySelector('img')
    img_issue.src = data.issue.user.avatar_url
    img_issue.width = 100
    img_issue.height = 100
    handlebar_template.querySelector('.github-user').innerText = data.issue.user.login

    //the actions that can be performed by the user on an issue in his repository. The details of the repository is provided in the controller.js file
    switch(data.action){
       case 'created': 
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = 'Action: New Comment\nTitle: ' +data.issue.title.substr(0)
         let update_comments = parseInt(data.issue.comments)+1
         document.getElementById(data.comment.issue_url).querySelector('.issue-comments').innerText = 'Nr of Comments: ' + update_comments.toString()
         document.getElementById(data.comment.issue_url).querySelector('.issue-updated').innerText = 'Updated: ' +  data.issue.updated_at
         break
         case 'closed':
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = 'Action: Issue Closed\nTitle: ' + data.issue.title.substr(0)
         document.getElementById(data.issue.url).style.display = 'none'
         break
         case 'reopened':
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = 'Action: Issue Reopened\nTitle: ' + data.issue.title.substr(0)
         document.getElementById(data.issue.url).style.display = ''
         break
         case 'deleted':
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = 'Action: Issue Deleted\nTitle: ' + data.issue.title.substr(0)
         document.getElementById(data.issue.url).style.display = 'none'
         break
         /* adds an element to 'All issues' */
         case 'opened':
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = 'Action: Issue Opened\nTitle: ' + data.issue.title.substr(0)
         let issue_list = document.getElementById('list-all-issues')
         let list_li = document.createElement('li')
         list_li.id= data.issue.url
         let issue_h2 = document.createElement('h2')
         issue_h2.id = 'issue-title'
         issue_h2.innerText = data.issue.title
         list_li.append(h2)
         let issue_comments = document.createElement('p')
         issue_comments.className = 'issue-comments'
         let comments_number = parseInt(data.issue.comments)+1
         comments_number.innerText = 'Nr of Comments: ' + number.toString()
         list_li.append(issue_comments)
         let a = document.createElement('a')
         a.href = data.issue.html_url
         a.innerText = 'Issue Link'
         list_li.append(a)
         let issue_updated = document.createElement('p')
         issue_updated.className = 'issue-updated'
         issue_updated.innerText = 'Updated: ' + data.issue.updated_at
         list_li.append(issue_updated)
         issue_list.append(list_li)
         break
         default:
         handlebar_template.querySelector('.user-action').querySelector('p').innerText = data.action + ' ' + data.issue.title.substr(0)
         break

     }
     list_li.append(handlebar_template)
     document.getElementById('issue-notifications').getElementsByTagName('ul')[0].appendChild(list_li)
})

