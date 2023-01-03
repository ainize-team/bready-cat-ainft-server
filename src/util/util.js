const sharp = require("sharp");
const crypto = require("crypto");

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

const decipherEncryptedData = (
  data,
  key,
  iv
) => {
  const algorithm = 'aes-128-cbc';
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

// please use this when you want to encrypt something.
// encrypted = cipherData(JSON.stringify(data), key, iv);
const cipherData = (data, key, iv) => {
  const algorithm = 'aes-128-cbc';
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

module.exports = {
    generateRandomInt,
    generateRandomString,
    compositeImage,
    decipherEncryptedData,
    cipherData
};
