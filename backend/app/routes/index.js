const auth  = require('./auth.routes')
const users = require('./users.routes')
const image = require('./image.routes');
const blog = require('./blog.routes');
module.exports = {
    auth,
    users,
    image,
    blog,
}