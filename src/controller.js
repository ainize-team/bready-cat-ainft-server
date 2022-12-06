const axios = require("axios");
const { createTask, getCompletedTask } = require("./text-to-art");
const { uploadFromMemory } = require("./storage");
const { setValue } = require("./ain");
const { STORAGE_BASE_URL, BUCKET_NAME, APP_NAME } = require("./const");

const writeWeatherImageUrlToAin = async (req, res) => {
    res.send("Triggered!");
    console.log("req :>> ", req);

    // text-to-image
    const prompt =
        "Sunny weather landscape with half hill and half sky , solid color, simple cartoon style";
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
    const path = "12-01-2022/image";
    await setValue(APP_NAME, path, { value: storageImageUrl });
    console.log(`Ain: set url(${storageImageUrl}) at ${path}`);
};

// for test
const generateRandomString = (num) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

module.exports = {
    writeWeatherImageUrlToAin,
};
