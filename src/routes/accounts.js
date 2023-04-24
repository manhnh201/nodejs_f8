const express = require('express')
const router = express.Router();
const accountsController = require('../app/controllers/AccountController')

router.post('/handle-form-actions', accountsController.handleFormActions)
router.get('/create', accountsController.create)
router.post('/store', accountsController.store)
router.get('/:id/edit', accountsController.edit)
router.put('/:id', accountsController.update)
router.delete('/:id', accountsController.destroy)
router.delete('/:id/force', accountsController.forceDestroy)
router.patch('/:id/restore', accountsController.restore)
router.post('/login', accountsController.login)
router.get('/sigout', accountsController.sigout)
// router.get('/:slug', accountsController.show)
// router.get('/', accountsController.index)

module.exports = router;
