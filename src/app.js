require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { onWriteWeatherTrigger } = require("./controller/triggerController");
const { getMetadata } = require("./controller/contractController");

const PORT = process.env.PORT;
const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("bready-cat-trigger is running");
});

app.post("/trigger", onWriteWeatherTrigger);

app.get("/:tokenId", getMetadata);

app.listen(PORT, () => {
    console.log(`bready-cat-trigger app listening on port ${PORT}`);
});
