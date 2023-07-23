import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const roleCollection = "roles";

const RoleSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  permissions: [{ type: Schema.Types.String }],
});

RoleSchema.plugin(paginate);

export const roleModel = mongoose.model(roleCollection, RoleSchema);
