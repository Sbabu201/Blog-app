const mongoose = require("mongoose")


const mongoConnect = async () => {

    try {
        await mongoose.connect("mongodb+srv://soumya:soumya@cluster0.envf3zr.mongodb.net/?retryWrites=true&w=majority");
        console.log(`connected to the database`)
    }
    catch (err) {
        console.log(err)
    }
};

module.exports = mongoConnect;