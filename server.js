const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
app.use(express.json());
app.use(cors());

const client = new Client({
    authStrategy: new LocalAuth()
});

// Array to store messages that the agent types on WhatsApp
let pendingFrontendMessages = [];

// Set to store the IDs of automated messages so we do not echo them back
const botMessageIds = new Set();
const chatId = "923044355096@c.us";

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WhatsApp Client is ready!");
});

// Listen for any new messages (including your own replies)
client.on("message_create", (msg) => {
    // Check if the message is in our target chat
    if (msg.to === chatId || msg.from === chatId) {
        // If the message ID is not in our botMessageIds set, it means a human typed it
        if (!botMessageIds.has(msg.id.id)) {
            pendingFrontendMessages.push(msg.body);
        }
    }
});

client.initialize();

app.post("/api/send-message", async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await client.sendMessage(chatId, message);
        
        // Save the automated message ID to avoid showing it in the frontend chat
        botMessageIds.add(response.id.id);
        
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// New endpoint for React to fetch the agent replies
app.get("/api/get-messages", (req, res) => {
    res.json({ success: true, messages: pendingFrontendMessages });
    // Clear the messages after sending them to the frontend
    pendingFrontendMessages = []; 
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});