const { mutipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/Product');


class SiteController {

    //[GET] /
    index(req, res, next) {

        Product.find({})
            .then(products => res.render('home', {
                products: mutipleMongooseToObject(products)
            }))
            .catch(next)
    }

    about(req, res, next) {
        res.render('about');
    }

    contact(req, res, next) {
        res.render('contact');
    }

    cart(req, res, next) {
        res.render('cart');
    }
}

module.exports = new SiteController();
