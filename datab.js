const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(process.env.DBS)
            .then(() => console.log("MongoDB connected successfully"))
            .catch((error) => console.error("MongoDB connection error:",error));
};