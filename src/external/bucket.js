const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { STORAGE_BASE_URL } = require("../const");

const BUCKET_NAME = process.env.BUCKET_NAME;
const serviceAccount = JSON.parse(`${process.env.GCP_SERVICE_ACCOUNT_KEY}`);
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
