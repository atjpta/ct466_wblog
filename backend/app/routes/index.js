const auth  = require('./auth.routes');
const users = require('./users.routes');
const image = require('./image.routes');
const blog = require('./blog.routes');
const comment = require('./comment.routes');
const vote = require ('./vote.routes');
const hashtag = require('./hashtag.routes');
const search = require('./search.routes');

module.exports = {
    auth,
    users,
    image,
    blog,
    comment,
    vote,
    hashtag,
    search,
}