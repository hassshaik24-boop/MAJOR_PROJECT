const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/roomly";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
       initData.data= initData.data.map((obj)=>({...obj,owner:'6a215729a6743b26e62fa58e'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

main()
.then(() => {
    console.log("connected to db");
    initDB();              // runs only after DB is connected
}).catch((err) => {
    console.log(err);
});