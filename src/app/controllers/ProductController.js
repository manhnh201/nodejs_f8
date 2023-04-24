const { mongooseToObject } = require('../../util/mongoose');
const Product = require('../models/Product');


class ProductController {

    //[GET] /products/:slug
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/show', {
                    product: mongooseToObject(product)
                })
            })
            .catch(next)
        // res.send('Product details');
    }

    //[GET] /products/create
    create(req, res) {
        res.render('products/create');
    }

    //[POST] /products/store
    store(req, res, next) {
        req.body.video = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const product = new Product(req.body);
        product
            .save()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    //[GET] /products/:id/edit
    edit(req, res) {
        Product.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: mongooseToObject(product)
            }))


    }

    //[GET] /products/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    //[DELETE] /products/:id
    destroy(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /products/:id/force
    forceDestroy(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATH] /products/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))

            .catch(next);
    }

    //[PATH] /products/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Product.delete({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Product.restore({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))

                    .catch(next);
                break;
            case 'forceDelete':
                Product.deleteOne({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new ProductController();
