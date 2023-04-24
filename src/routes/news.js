const express = require('express')
const router = express.Router();
const newsController = require('../app/controllers/NewsController')

router.post('/handle-form-actions', newsController.handleFormActions)
router.get('/create', newsController.create)
router.post('/store', newsController.store)
router.get('/:id/edit', newsController.edit)
router.put('/:id', newsController.update)
router.delete('/:id', newsController.destroy)
router.delete('/:id/force', newsController.forceDestroy)
router.patch('/:id/restore', newsController.restore)
router.get('/:slug', newsController.show)
router.get('/', newsController.index)

module.exports = router;
