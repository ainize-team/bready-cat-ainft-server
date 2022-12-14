const axios = require("axios");
const fs = require("fs/promises");
const bucket = require("../external/bucket");
const ain = require("../external/ain");
const { createTask, getCompletedTask } = require("../external/text-to-art");
const {
    generateRandomString,
    parsePath,
    formatPath,
    compositeImage,
    bucketFileUrl,
} = require("../util/util");
const { GAS_PRICE, CAT_TYPES } = require("../const");
const backgroundFilePath = "./resource/tmp/background.png";
const compositeFilePath = "./resource/tmp/composite.png";

const writeWeatherImageUrlToAin = async (ref, weather) => {
    // ref: app/bready_cat/$date/weather
    const parsedRef = parsePath(ref);
    const date = parsedRef[2];

    // text-to-image
    // TODO: env로 postfix, prefix 빼기
    const prompt = `${weather} weather landscape with half hill and half sky , solid color, simple cartoon style`;
    const imageUrl = await textToImage(prompt);

    const { data: image } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const destFilePath = `${date}/weather/background_${generateRandomString(5)}.png`;
    await bucket.file(destFilePath).save(image);
    console.log(`Storage: upload ${imageUrl} to ${destFilePath}`);

    // write image url to ain
    const storageImageUrl = bucketFileUrl(destFilePath);
    const backgroundPath = formatPath([...parsedRef.slice(0, parsedRef.length - 1), "background"]);
    saveToAin(backgroundPath, storageImageUrl);
    try {
        await bucket.file(destFilePath).download({
            destination: backgroundFilePath,
        });

        for (const catType of CAT_TYPES) {
            const catFilePath = `./resource/tmp/${catType}.png`;
            await bucket.file(`v1/cat/${catType}.png`).download({
                destination: catFilePath,
            });
            await compositeImage(backgroundFilePath, catFilePath, compositeFilePath);
            const compositeFile = await fs.readFile(compositeFilePath);
            await bucket.file(`v1/ainft/${catType}.png`).save(compositeFile);
            console.log(`update v1/ainft/${catType}.png`);
        }
        console.log("update all AINFTs");
    } catch (error) {
        console.error(error);
    }
};

function saveToAin(path, value) {
    ain.db
        .ref(path)
        .setValue({ value, nonce: -1, gas_price: GAS_PRICE })
        .then((res) => {
            if (res["result"]["message"] !== undefined) {
                throw new Error(JSON.stringify(res));
            } else {
                console.log(`Ain: set url(${value}) at ${path}`);
                console.log(JSON.stringify(res));
            }
        });
}

async function textToImage(prompt) {
    const { task_id: taskId } = await createTask(prompt);
    console.log("taskId :>> ", taskId);

    const { result } = await getCompletedTask(taskId);
    console.log("result :>> ", JSON.stringify(result));

    // upload image to storage
    return result[1].url;
}

module.exports = {
    writeWeatherImageUrlToAin,
};
