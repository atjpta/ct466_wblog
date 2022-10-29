const user = require("./user.models")
const role = require("./role.models")
const vote = require("./vote.models")
const blog = require('./blog.models')
const comment = require('./comment.models')
const hashtag = require('./hashtag.models')
const gem = require('./pgem.models')
const premium = require('./ppremium.models')
const billgem = require('./billgem.models')
const billpremium = require('./billpremium.models')

module.exports = {
    user,
    role,
    vote,
    blog,
    comment,
    hashtag,
    gem,
    premium,
    billgem,
    billpremium,
}