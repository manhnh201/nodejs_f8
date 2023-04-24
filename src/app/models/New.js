const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const New = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    image: { type: String, required: true },
    videoId: { type: String },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
New.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('New', New);
