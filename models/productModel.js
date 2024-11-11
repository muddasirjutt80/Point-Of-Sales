const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//for create table into db
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    //for date
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
