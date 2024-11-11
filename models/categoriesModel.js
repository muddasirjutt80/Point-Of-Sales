const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//for create table into db
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

module.exports = mongoose.model("Category", categorySchema);
