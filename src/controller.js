const axios = require("axios");
const { createTask, getCompletedTask } = require("./text-to-art");
const { uploadFromMemory } = require("./storage");
const { setValue } = require("./ain");
const { generateRandomString, parsePath, formatPath } = require("./util");
const { STORAGE_BASE_URL, BUCKET_NAME, APP_NAME } = require("./const");

const writeWeatherImageUrlToAin = async (req, res) => {
    console.log("req :>> ", req);
    // console.log("req.body :>> ", req.body);
    // console.log("req.body.transaction :>> ", req.body.transaction);
    // const tx = req.body.transaction;
    // validateTransaction(tx);

    // console.log("tx.tx_body_operation :>> ", tx.tx_body_operation);
    // const { ref, value: weather } = tx.tx_body.operation;
    // // app/appname/...
    // const parsedRef = parsePath(ref);

    // text-to-image
    // const prompt = `${weather} weather landscape with half hill and half sky , solid color, simple cartoon style`;
    const prompt = `Sunny weather landscape with half hill and half sky , solid color, simple cartoon style`;
    const { task_id: taskId } = await createTask(prompt);
    console.log("taskId :>> ", taskId);

    const { result } = await getCompletedTask(taskId);
    console.log("result :>> ", result);

    // upload image to storage
    const imageUrl = result[1].url;
    const { data: image } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const destFileName = `date/weather/${generateRandomString(5)}.png`;
    await uploadFromMemory(destFileName, image);
    console.log(`Storage: upload ${imageUrl} to ${destFileName}`);

    // write image url to ain
    const storageImageUrl = `${STORAGE_BASE_URL}/${BUCKET_NAME}/${destFileName}`;
    // const backgroundPath = formatPath([...parsedRef.slice(2, parsedRef.length - 1), "background"]);
    const backgroundPath = "asdfew/background";
    await setValue(APP_NAME, backgroundPath, { value: storageImageUrl });
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
