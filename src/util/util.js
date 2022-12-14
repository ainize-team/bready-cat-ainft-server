const sharp = require("sharp");

const generateRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const generateRandomString = (num) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

const compositeImage = (back, front, outputPath) => {
    return sharp(back)
        .resize({
            width: 1024,
            height: 1024,
        })
        .composite([
            {
                input: front,
                top: 256,
                left: 0,
            },
        ])
        .toFile(outputPath);
};

module.exports = {
    generateRandomInt,
    generateRandomString,
    compositeImage,
};
