const productsController = require('../controllers/productController');



function getProducts(fastify, opts, done) {
    fastify.get('/products',  productsController.getProducts);
    done();
}

module.exports = {
    getProducts: getProducts
}