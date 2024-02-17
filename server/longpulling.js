const express = require("express");
const cors = require("cors");
const events = require("events");

const PORT = 3000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-message", (req, res) => {
  emitter.once("newMessage", (message) => {
    return res.json(message);
  });
});

app.post("/post-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200).end();
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
