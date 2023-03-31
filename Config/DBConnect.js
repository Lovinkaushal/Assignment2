const mongoose=require("mongoose")
const dbConnect = async ()=>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Assignment1')
        console.log("Database Connected Sucessfully")
    } catch(error) {
        console.log("Database Error", error);
    }
}

module.exports = dbConnect;