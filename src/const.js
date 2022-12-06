const isProd = process.env.PROVIDER_URL === "https://mainnet-api.ainetwork.ai";

const SEED_RANGE = 4_294_967_295;

// Discord mock ID to bypass Discord and call API directly
const DISCORD_MOCK_ID = isProd ? "bready-cat" : "bready-cat-dev";

const BUCKET_NAME = isProd ? "bready-cat" : "bready-cat-dev";

const STORAGE_BASE_URL = "https://storage.cloud.google.com";

module.exports = {
    DISCORD_MOCK_ID,
    BUCKET_NAME,
    STORAGE_BASE_URL,
    SEED_RANGE,
};
