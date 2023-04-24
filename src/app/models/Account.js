const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const Account = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    slug: { type: String, slug: 'username', unique: true },
}, {
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Account', Account);
