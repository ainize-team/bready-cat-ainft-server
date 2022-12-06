require("dotenv").config();
const express = require("express");
const { writeWeatherImageUrlToAin } = require("./controller");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("bready-cat-trigger is running");
});

app.post("/trigger", writeWeatherImageUrlToAin);

app.listen(PORT, () => {
    console.log(`bready-cat-trigger app listening on port ${PORT}`);
});
