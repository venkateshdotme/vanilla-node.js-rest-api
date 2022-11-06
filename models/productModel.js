const { v4: uuidv4 } = require("uuid");

const products = require("../data/products");
const { writeDataToFile } = require("../utils");

function all() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };

        products.push(newProduct);

        writeDataToFile("./data/products.json", products);
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);

        products[index] = {id, ...product};

        writeDataToFile("./data/products.json", products);
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const productsList = products.filter((p) => p.id !== id);
        writeDataToFile("./data/products.json", productsList);
        resolve();
    });
}

module.exports = {
    all,
    findById,
    create,
    update,
    remove
};
