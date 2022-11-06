const Product = require('../models/productModel');
const { getRequestBody } = require('../utils');

async function getProducts(req, res) {
    try {

        const products = await Product.all();

        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(products));

    } catch (error) {
        console.log(error);
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if(!product) {
            res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({message: "Product not found"}));
        } else {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        
    }
}

async function createProduct(req, res) {
    try {

        const body = await getRequestBody(req);

        const { title, description, price } = JSON.parse(body);

            const product = {
                title,
                description,
                price
            }

            const newProduct = await Product.create(product);

            res.writeHead(201, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify(newProduct)); 

    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req, res, id) {
    try {

        const product = await Product.findById(id);

        if(!product) {
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message: "Product not found"}));
        } else {
            const body = await getRequestBody(req);

            const { title, description, price } = JSON.parse(body);
    
                const productData = {
                    title: title || product.title,
                    description: description || product.description,
                    price: price || product.price
                }
    
                const updatedProduct = await Product.update(id, productData);
    
                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.end(JSON.stringify(updatedProduct));
        } 

    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res, id) {
    try {

        const product = await Product.findById(id);

        if(!product) {
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message: "Product not found"}));
        } else {
            await Product.remove(id);

            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message : "success"}));
        } 

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}