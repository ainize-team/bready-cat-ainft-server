const axios = require("axios");
const { createTask, getCompletedTask } = require("./text-to-art");
const { uploadFromMemory } = require("./storage");
const { ain } = require("./ain");
const { generateRandomString, parsePath, formatPath } = require("./util");
const { STORAGE_BASE_URL, BUCKET_NAME } = require("./const");

const writeWeatherImageUrlToAin = async (req, res) => {
    res.send("Triggered!");

    const tx = req.body.transaction;
    validateTransaction(tx);

    const { ref, value: weather } = tx.tx_body.operation;
    // ref: app/bready_cat/$date/weather
    const parsedRef = parsePath(ref);
    const date = parsedRef[2];

    // text-to-image
    const prompt = `${weather} weather landscape with half hill and half sky , solid color, simple cartoon style`;
    const { task_id: taskId } = await createTask(prompt);
    console.log("taskId :>> ", taskId);

    const { result } = await getCompletedTask(taskId);
    console.log("result :>> ", result);

    // upload image to storage
    const imageUrl = result[1].url;
    const { data: image } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const destFileName = `${date}/weather/background_${generateRandomString(5)}.png`;
    await uploadFromMemory(destFileName, image);
    console.log(`Storage: upload ${imageUrl} to ${destFileName}`);

    // write image url to ain
    const storageImageUrl = `${STORAGE_BASE_URL}/${BUCKET_NAME}/${destFileName}`;
    const backgroundPath = formatPath([...parsedRef.slice(0, parsedRef.length - 1), "background"]);
    await ain.db.ref(backgroundPath).setValue({ value: storageImageUrl });
    console.log(`Ain: set url(${storageImageUrl}) at ${backgroundPath}`);
};

const validateTransaction = (tx) => {
    if (!tx || !tx.tx_body || !tx.tx_body.operation) {
        throw new Error(`Invalid tx: ${JSON.stringify(tx)}`);
    }
    if (tx.tx_body.operation.type !== "SET_VALUE") {
        throw new Error(`Not supported tx type: ${tx.tx_body.operation.type}`);
    }
};

module.exports = {
    writeWeatherImageUrlToAin,
};
