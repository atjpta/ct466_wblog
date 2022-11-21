const user = require("./user.models")
const role = require("./role.models")
const vote = require("./vote.models")
const blog = require('./blog.models')
const comment = require('./comment.models')
const hashtag = require('./hashtag.models')
const question = require('./question.models')
const cart = require('./cart.models')
const bill = require('./bill.models')
const report = require('./report.models')
module.exports = {
    user,
    role,
    vote,
    blog,
    comment,
    hashtag,
    question,
    cart,
    bill,
    report,
}