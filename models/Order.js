const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    productid: {
        type: String,
        required: true,
    },
    productsize: {
        type: String,
        required: true,
    },
    productquantity: {
        type: String,
        required: true,
    },
    useraddress: {
        type: String,
        required: true,
    },
    paymenttype: {
        type: String,
        required: true,
    },
    createddate: {
        type: String,
        required: true,
    },
    completeddate: {
        type: String,
    },
    orderstatus: {
        type: String,
        required: true,
    }
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;