const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { BUCKET_NAME } = require("./const");

let serviceAccount;
try {
    serviceAccount = JSON.parse(
        Buffer.from(process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64, "base64").toString("utf8")
    );
} catch (error) {
    console.error("GCP_SERVICE_ACCOUNT_KEY_BASE64:", process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64);
    console.error(error);
}

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
