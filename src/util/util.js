const { STORAGE_BASE_URL, BUCKET_NAME } = require("../const");
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

const parsePath = (path) => {
    if (!path) {
        return [];
    }

    return path.split("/").filter((node) => {
        return !!node;
    });
};

const formatPath = (parsedPath) => {
    if (!Array.isArray(parsedPath) || parsedPath.length === 0) {
        return "/";
    }
    let formatted = "";
    for (const label of parsedPath) {
        formatted += "/" + String(label);
    }
    return (formatted.startsWith("/") ? "" : "/") + formatted;
};

const bucketFileUrl = (path) => {
    return `${STORAGE_BASE_URL}/${BUCKET_NAME}/${path}`;
};

module.exports = {
    generateRandomInt,
    generateRandomString,
    parsePath,
    formatPath,
    bucketFileUrl,
};
