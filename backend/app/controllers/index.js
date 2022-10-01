const auth = require('./auth.controller')
const user = require('./users.controller')
const image = require('./Image.controller')
const blog = require('./blog.controller')
module.exports = {
    auth,
    user,
    image,
    blog,
}