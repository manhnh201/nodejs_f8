const { mutipleMongooseToObject } = require('../../util/mongoose');
const Product = require('../models/Product');
const New = require('../models/New');
const Account = require('../models/Account');


class MeController {

    //[GET] /me/stored/products
    storedProducts(req, res, next) {

        Promise.all([Product.find({}), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('me/stored-products', {
                    deletedCount,
                    products: mutipleMongooseToObject(products)
                }))
            .catch(next)
    }

    //[GET] /me/trash/products
    trashProducts(req, res, next) {
        Product.findDeleted({})
            .then(products => res.render('me/trash-products', {
                products: mutipleMongooseToObject(products)
            }))
            .catch(next);
    }

    //[GET] /me/stored/news
    storedNews(req, res, next) {
        Promise.all([New.find({}), New.countDocumentsDeleted()])
            .then(([news, deletedCount]) =>
                res.render('me/stored-news', {
                    deletedCount,
                    news: mutipleMongooseToObject(news)
                }))
            .catch(next)
    }

    trashNews(req, res, next) {
        New.findDeleted({})
            .then(news => res.render('me/trash-news', {
                news: mutipleMongooseToObject(news)
            }))
            .catch(next);
    }

    //[GET] /me/stored/news
    storedAccounts(req, res, next) {
        Promise.all([Account.find({}), Account.countDocumentsDeleted()])
            .then(([accounts, deletedCount]) =>
                res.render('me/stored-accounts', {
                    deletedCount,
                    accounts: mutipleMongooseToObject(accounts)
                }))
            .catch(next)
    }

    trashAccounts(req, res, next) {
        Account.findDeleted({})
            .then(accounts => res.render('me/trash-accounts', {
                accounts: mutipleMongooseToObject(accounts)
            }))
            .catch(next);
    }
}

module.exports = new MeController();
