import { ticketModel } from "../model/ticket.model.js";
import Ticket from "../../../domain/entities/ticket.js";
class TicketMongooseRepository {
  async purchase(data) {
    const document = await ticketModel.create(data);

    if (!document) return null;

    return new Ticket({
      code: document.code,
      purchase_datetime: document.purchase_datetime,
      amount: document.amount,
      purchaser: document.purchaser,
    });
  }
}
export default TicketMongooseRepository;
