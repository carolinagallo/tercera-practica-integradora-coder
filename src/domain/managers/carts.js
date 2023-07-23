import container from "../../shared/container.js";

class CartManager {
  constructor() {
    this.cartRepository = container.resolve("CartRepository");
  }

  async addCart(cart) {
    return await this.cartRepository.createCart(cart);
  }

  async getCartById(idCart) {
    return await this.cartRepository.findCartById(idCart);
  }

  async updateCart(id, pid) {
    return await this.cartRepository.updateCart(id, pid);
  }

  async deleteOneProduct(idCart, idProduct) {
    return await this.cartRepository.deleteProduct(idCart, idProduct);
  }

  async deleteAllProducts(id) {
    return await this.cartRepository.deleteAllProducts(id);
  }

  async changeAllProducts(cid, data) {
    return await this.cartRepository.changeProducts(cid, data);
  }

  async changeQuantity(cid, pid, quantity) {
    return await this.cartRepository.newQuantity(cid, pid, quantity);
  }
}

export default CartManager;
