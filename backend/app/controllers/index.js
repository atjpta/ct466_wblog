const auth = require('./auth.controller')
const user = require('./users.controller')
const image = require('./Image.controller')
const blog = require('./blog.controller')
const comment = require('./comment.controller')
const voted = require('./vote.controller')
const search = require('./search.controller')

module.exports = {
    auth,
    user,
    image,
    blog,
    comment,
    voted,
    search,
}