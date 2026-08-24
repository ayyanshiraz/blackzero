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

let pendingFrontendMessages = {};
const botMessageIds = new Set();
const chatId = "923044355096@c.us";

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WhatsApp Client is ready!");
});

// Handle incoming messages with safe quote checking
client.on("message_create", async (msg) => {
    if (!msg || !msg.id || !msg.id.id) return;

    if (msg.to === chatId || msg.from === chatId) {
        if (!botMessageIds.has(msg.id.id)) {
            if (msg.hasQuotedMsg) {
                try {
                    // Extract quoted body from raw data to avoid puppeteer evaluation errors
                    const quotedBody = msg._data && msg._data.quotedMsg && msg._data.quotedMsg.body;
                    
                    if (quotedBody) {
                        const match = quotedBody.match(/\[#(.*?)\]/);
                        if (match && match[1]) {
                            const sessionId = match[1];
                            if (!pendingFrontendMessages[sessionId]) {
                                pendingFrontendMessages[sessionId] = [];
                            }
                            pendingFrontendMessages[sessionId].push(msg.body);
                        }
                    }
                } catch (err) {
                    console.error("Error reading quoted message safely:", err);
                }
            } else {
                console.log("Agent replied without quoting a message.");
            }
        }
    }
});

client.initialize();

app.post("/api/send-message", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await client.sendMessage(chatId, message);
        
        if (response && response.id && response.id.id) {
            botMessageIds.add(response.id.id);
        }
        
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/get-messages", (req, res) => {
    const sessionId = req.query.sessionId;
    if (!sessionId) {
        return res.json({ success: false, error: "Session ID required" });
    }

    const messages = pendingFrontendMessages[sessionId] || [];
    delete pendingFrontendMessages[sessionId]; 
    
    res.json({ success: true, messages });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});