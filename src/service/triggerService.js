const axios = require("axios");
const fs = require("fs/promises");
const bucket = require("../external/bucket");
const ain = require("../external/ain");
const { textToArt } = require("../external/text-to-art");
const { compositeImage, generateRandomString } = require("../util/util");
const { CAT_TYPES } = require("../const");

/**
 * 1. create background image with weather using text-to-art
 * 2. Composition of background image and cat
 * 3. update storage for each compositions
 * 4. write back in ain background image url
 * @param {string} ref updated ref on ainetwork (app/bready_cat/$date/weather)
 * @param {*} weather updated value
 */
const writeWeatherImageUrlToAin = async (ref, weather) => {
    const parsedRef = ain.parseRef(ref);
    const date = parsedRef[2];
    const backgroundFilePath = `${date}/weather/background_${generateRandomString(5)}.png`;
    const backgroundImgPath = `./resource/tmp/background.png`;
    const compositeImgPath = "./resource/tmp/composite.png";

    // text-to-image
    const prompt = {
        positive: `${process.env.PREFIX_PROMPT ?? ""} ${weather} ${
            process.env.POSTFIX_PROMPT ?? ""
        }`,
        negative: process.env.NEGATIVE_PROMPT,
    };
    console.log("prompt :>> ", prompt);
    const imageUrl = await textToArt(prompt);
    const { data: background } = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Use random strings to prevent overwriting
    await bucket.upload(backgroundFilePath, background);
    console.log(`Storage: upload ${imageUrl} to ${backgroundFilePath}`);

    // After compositing the background picture for each cat, save it to the storage
    await bucket.download(backgroundFilePath, backgroundImgPath);
    for (const catType of CAT_TYPES) {
        const catImgPath = `./resource/cat/${catType}.png`;
        // NOTE(haechan@comcom.ai): Which is better, storage or local?
        // await bucket.download(`v1/cat/${catType}.png`, catImgPath);
        await compositeImage(backgroundImgPath, catImgPath, compositeImgPath);
        const compositeImg = await fs.readFile(compositeImgPath);
        await bucket.uploadPublic(`v1/ainft/${catType}.png`, compositeImg);

        console.log(`update v1/ainft/${catType}.png`);
    }
    console.log("update all AINFTs");

    // write backgroundImgUrl to ainetwork
    const backgroundRef = ain.formatRef([
        ...parsedRef.slice(0, parsedRef.length - 1),
        "background",
    ]);
    const backgroundImgUrl = bucket.objectUrl(backgroundFilePath);
    const ainRes = await ain.write(backgroundRef, backgroundImgUrl);

    console.log(`Ain: set url(${backgroundImgUrl}) at ${backgroundRef}`);
    console.log(JSON.stringify(ainRes));
};

module.exports = {
    writeWeatherImageUrlToAin,
};
