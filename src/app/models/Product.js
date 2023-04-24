const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const Product = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    video: { type: String },
    videoId: { type: String },
    price_new: { type: String },
    price_old: { type: String },
    prod_if: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Product', Product);
