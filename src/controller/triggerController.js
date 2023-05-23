const { validateTransaction } = require("../util/validator");
const { writeWeatherImageUrlToAin } = require("../service/triggerService");

const onWriteWeatherTrigger = async (req, res) => {
    res.send("Triggered!");

    const tx = req.body.transaction;
    validateTransaction(tx);

    const { ref, value: weather } = tx.tx_body.operation;
    await writeWeatherImageUrlToAin(ref, weather);
    console.log("done!");
};

module.exports = {
    onWriteWeatherTrigger,
};
