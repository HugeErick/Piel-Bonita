import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config(); // Loads your ADMIN_SECRET

const SECRET = process.env.ADMIN_SECRET;
const timestamp = Math.floor(Date.now() / 1000 / 300); // 5-min window
const hmac = crypto.createHmac("sha256", SECRET).update(timestamp.toString()).digest("hex");

const token = `${timestamp}.${hmac}`;
console.log(`Your admin URL for the next 5 mins is:\nhttps://yourdomain.com/admin?key=${token}`);
