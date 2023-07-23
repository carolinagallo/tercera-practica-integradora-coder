import mongoose, { Schema } from "mongoose";
import randomstring from "randomstring";

const ticketCollection = "tickets";

const TicketSchema = new Schema({
  code: { type: Schema.Types.String },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Schema.Types.Number, required: true },
  purchaser: { type: Schema.Types.String, required: true },
});

TicketSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = randomstring.generate(8);
  }
  next();
});

export const ticketModel = mongoose.model(ticketCollection, TicketSchema);
