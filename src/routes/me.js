const express = require('express')
const router = express.Router();
const meController = require('../app/controllers/MeController')

router.get('/stored/products', meController.storedProducts)
router.get('/trash/products', meController.trashProducts)
router.get('/stored/news', meController.storedNews)
router.get('/trash/news', meController.trashNews)
router.get('/stored/accounts', meController.storedAccounts)
router.get('/trash/accounts', meController.trashAccounts)

module.exports = router;
