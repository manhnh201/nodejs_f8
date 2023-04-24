const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");
const Account = require("../models/Account");

class AccountController {

    //[GET] /news
    // index(req, res, next) {
    //     New.find({})
    //         .then(news => res.render('news', {
    //             news: mutipleMongooseToObject(news)
    //         }))
    //         .catch(next)
    // }

    create(req, res, next) {
        res.render('accounts/create')
    }

    store(req, res, next) {
        const formData = req.body
        const account = new Account(formData);
        account
            .save()
            .then(() => res.redirect('/me/stored/accounts'))
            .catch(next);
    }

    //[GET] /accounts/:id/edit
    edit(req, res) {
        Account.findById(req.params.id)
            .then(account => res.render('accounts/edit', {
                account: mongooseToObject(account)
            }))
    }

    //[GET] /accounts/:id
    update(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/accounts'))
            .catch(next);
    }

    //[DELETE] /accounts/:id
    destroy(req, res, next) {
        Account.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /accounts/:id/force
    forceDestroy(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATH] /accounts/:id/restore
    restore(req, res, next) {
        Account.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))

            .catch(next);
    }

    //[PATH] /accounts/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Account.delete({ _id: { $in: req.body.accountIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Account.restore({ _id: { $in: req.body.accountIds } })
                    .then(() => res.redirect('back'))

                    .catch(next);
                break;
            case 'forceDelete':
                Account.deleteOne({ _id: { $in: req.body.accountIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

    login(req, res) {
        const user = Account.findOne({ username: req.body.username })
        console.log(user)
        if (!user) {
            console.log("k thay")
        }
        const validPassword = ((req.body.password) == (user.password))
        if (!validPassword) {
            console.log("k thay")
        }

    }

    sigout(req, res) {
        res.render('./accounts/login')
    }

    // //[GET] /news/:slug
    // show(req, res, next) {
    //     New.findOne({ slug: req.params.slug })
    //         .then(tintuc => {
    //             res.render('news/show', {
    //                 tintuc: mongooseToObject(tintuc)
    //             })
    //         })
    //         .catch(next)
    // }
}

module.exports = new AccountController();
