import data from '../properties.json';

export function getNameById(id) {
    const product = data.filter((item) => item._id == id);
    return product[0].name;
}

export function getPriceById(id) {
    const product = data.filter((item) => item._id == id);
    return product[0].price;
}