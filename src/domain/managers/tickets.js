import container from "../../shared/container.js";
import Product from "../entities/product.js";
import CartManager from "./carts.js";
import ProductManager from "./products.js";
import { sendMail } from "../../shared/mailing.js";

class TicketManager {
  constructor() {
    this.ticketRepository = container.resolve("TicketRepository");
  }

  async purchaseCart(cid, user) {
    const cartManager = new CartManager();
    const productManager = new ProductManager();

    const cart = await cartManager.getCartById(cid);

    const products = cart.products;
    const email = user.email;

    for (const product of products) {
      const productReal = await productManager.getProductById(product.id._id);

      if (productReal.stock < product.quantity) {
        return `Rejected purchase, NO stock of : ${productReal.title}`;
      }

      const newStock = Number(productReal.stock - product.quantity);
      await productManager.updateProduct(productReal.id, { stock: newStock });
    }

    let total = 0;
    cart.products.forEach((product) => {
      const price = product.price;
      const quantity = product.quantity;
      total += quantity * price;
    });

    const data = {
      amount: total,
      purchaser: email,
    };

    const ticket = await this.ticketRepository.purchase(data);

    await sendMail(ticket);

    return ticket;
  }
}

export default TicketManager;
