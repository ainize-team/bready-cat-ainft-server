const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { BUCKET_NAME } = require("./const");
const serviceAccount = require("../resource/serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${BUCKET_NAME}.appspot.com`,
});

const bucket = getStorage().bucket(BUCKET_NAME);

const uploadFromMemory = async (destFileName, contents) => {
    return bucket.file(destFileName).save(contents);
};

module.exports = {
    uploadFromMemory,
};
