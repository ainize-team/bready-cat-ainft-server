const isProd = 0;

const APP_NAME = isProd ? "bready_cat" : "bready_cat";

const NETWORK_NAME = isProd ? "mainnet" : "testnet";

const PORT = 3000;

// Discord mock ID to bypass Discord and call directly
const DISCORD_MOCK_ID = "bready-cat-ainft";

const BUCKET_NAME = "bready-cat-ainft";

const STORAGE_BASE_URL = "https://storage.cloud.google.com";

module.exports = {
    isProd,
    APP_NAME,
    NETWORK_NAME,
    PORT,
    DISCORD_MOCK_ID,
    BUCKET_NAME,
    STORAGE_BASE_URL,
};
