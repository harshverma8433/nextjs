import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number
}

const connection:ConnectionObject = {}

async function dbConnnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected to Database");
        return
    }
    try{
        const db = await  mongoose.connect(process.env.MONGO_URI || '' )
        connection.isConnected = db.connections[0].readyState
        console.log("DB CONNECTED SUCCESSFULLY");
        
    }catch(error){
        console.log("DB CONNECTION FAILED",error);
        process.exit(1);
        
    }
}

export default dbConnnect