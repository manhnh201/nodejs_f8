const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");
const New = require("../models/New");

class NewsController {

    //[GET] /news
    index(req, res, next) {
        New.find({})
            .then(news => res.render('news', {
                news: mutipleMongooseToObject(news)
            }))
            .catch(next)
    }

    create(req, res, next) {
        res.render('news/create')
    }

    store(req, res, next) {
        req.body.video = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const tintuc = new New(req.body);
        tintuc
            .save()
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }

    //[GET] /news/:id/edit
    edit(req, res) {
        New.findById(req.params.id)
            .then(tintuc => res.render('news/edit', {
                tintuc: mongooseToObject(tintuc)
            }))
    }

    //[GET] /news/:id
    update(req, res, next) {
        New.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }

    //[DELETE] /news/:id
    destroy(req, res, next) {
        New.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /news/:id/force
    forceDestroy(req, res, next) {
        New.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATH] /news/:id/restore
    restore(req, res, next) {
        New.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))

            .catch(next);
    }

    //[PATH] /news/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                New.delete({ _id: { $in: req.body.newIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                New.restore({ _id: { $in: req.body.newIds } })
                    .then(() => res.redirect('back'))

                    .catch(next);
                break;
            case 'forceDelete':
                New.deleteOne({ _id: { $in: req.body.newIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

    //[GET] /news/:slug
    show(req, res, next) {
        New.findOne({ slug: req.params.slug })
            .then(tintuc => {
                res.render('news/show', {
                    tintuc: mongooseToObject(tintuc)
                })
            })
            .catch(next)
    }
}

module.exports = new NewsController();
