const auth = require('./auth.routes');
const users = require('./users.routes');
const image = require('./image.routes');
const blog = require('./blog.routes');
const comment = require('./comment.routes');
const vote = require('./vote.routes');
const hashtag = require('./hashtag.routes');
const search = require('./search.routes');
const question = require('./question.routes');
const cart = require('./cart.routes');
const bill = require('./bill.routes');
const report = require('./report.routes');
exports.Start = (app) => {
    auth(app)
    users(app)
    image(app)
    blog(app)
    comment(app)
    vote(app)
    hashtag(app)
    search(app)
    question(app)
    cart(app)
    bill(app)
    report(app)
}
