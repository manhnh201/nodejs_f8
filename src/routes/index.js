const newsRouter = require('./news');
const productsRouter = require('./products');
const siteRouter = require('./site');
const meRouter = require('./me');
const accountsRouter = require('./accounts');

function route(app) {

    app.use('/accounts', accountsRouter)

    app.use('/news', newsRouter)

    app.use('/products', productsRouter)

    app.use('/me', meRouter)

    app.use('/', siteRouter)

}

module.exports = route;
