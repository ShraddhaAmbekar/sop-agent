const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ambekarshraddha21_db_user:987654321@sop-agent.skbndpz.mongodb.net/", {
      serverSelectionTimeoutMS: 5000, 
    });
    
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
