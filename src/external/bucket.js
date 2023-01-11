const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { STORAGE_BASE_URL, BUCKET_NAME, GCP_SERVICE_ACCOUNT_BASE64_ENCRYPTED } = require("../const");
const { decipherEncryptedData, cipherData } = require("../util/util");

const serviceAccount = JSON.parse(
    Buffer.from(decipherEncryptedData(
        GCP_SERVICE_ACCOUNT_BASE64_ENCRYPTED,
        process.env.GCP_SA_PRIVATE_KEY,
        process.env.GCP_SA_PRIVATE_IV
    ), "base64").toString("utf8")
);

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${BUCKET_NAME}.appspot.com`,
});

const bucket = getStorage().bucket(BUCKET_NAME);

const objectUrl = (path) => {
    return `${STORAGE_BASE_URL}/${BUCKET_NAME}/${path}`;
};

const uploadPublic = async (path, image) => {
    await bucket.file(path).save(image);
    await bucket.file(path).makePublic();
};

const upload = async (path, image) => {
    await bucket.file(path).save(image);
};

const download = (path, destination) => {
    return bucket.file(path).download({ destination });
};

module.exports = {
    objectUrl,
    upload,
    uploadPublic,
    download,
};
