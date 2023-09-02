export default class Product {
    constructor(id, name, price, image, brand, quantity = 1) {
        this.id = id;
        this.name = name;
        this.price = price * 1;
        this.image = image;
        this.brand = brand;
        this.quantity = quantity;
    }


    Total = function () {
        return this.price * this.quantity;
    }
}