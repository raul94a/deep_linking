const productsJson  = [
    {
        "id": 1,
        "name": "Tuna - Loin",
        "price": 24.79,
        "description": "Other dilation and curettage"
    },
    {
        "id": 2,
        "name": "Dry Ice",
        "price": 72.0,
        "description": "Abdominoperineal resection of the rectum, not otherwise specified"
    },
    {
        "id": 3,
        "name": "Sole - Dover, Whole, Fresh",
        "price": 21.98,
        "description": "Incision of large intestine"
    },
    {
        "id": 4,
        "name": "Crackers Cheez It",
        "price": 66.32,
        "description": "Retrobulbar injection of therapeutic agent"
    },
    {
        "id": 5,
        "name": "Gooseberry",
        "price": 89.92,
        "description": "Other arthrotomy, elbow"
    }
]

async function getProducts(req, reply) {
    return reply.send(productsJson);
}

module.exports = {
    getProducts: getProducts
}