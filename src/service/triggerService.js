const axios = require("axios");
const bucket = require("../external/bucket");
const ain = require("../external/ain");
const { createTask, getCompletedTask } = require("../external/text-to-art");
const {
    generateRandomString,
    parsePath,
    formatPath,
    bucketFileUrl,
} = require("../util/util");
const { GAS_PRICE } = require("../const");

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

    // TODO: 이미지 합성하고, bucket 날짜 하위에 저장, bucket 고양이 서비스에도 저장, ain에 두 url 다 저장
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
