const express = require("express");
const { writeWeatherImageUrlToAin } = require("./controller");
const { PORT } = require("./const");

const app = express();

app.get("/", (req, res) => {
    res.send("bready-cat-trigger is running");
});

app.post("/onWriteWeatherTrigger", writeWeatherImageUrlToAin);

app.listen(PORT, () => {
    console.log(`bready-cat-trigger app listening on port ${PORT}`);
});
