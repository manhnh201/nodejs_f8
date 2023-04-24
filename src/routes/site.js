const express = require('express')
const router = express.Router();
const siteController = require('../app/controllers/SiteController')


router.get('/', siteController.index)
router.get('/about', siteController.about)
router.get('/contact', siteController.contact)
router.get('/cart', siteController.cart)

module.exports = router;
