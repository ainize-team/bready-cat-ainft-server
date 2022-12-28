const isProd = process.env.PROVIDER_URL === "https://mainnet-api.ainetwork.ai";

const SEED_RANGE = 4_294_967_295;

// Discord mock ID to bypass Discord and call API directly
const DISCORD_MOCK_ID = isProd ? "bready-cat" : "bready-cat-dev";

const BUCKET_NAME = isProd ? "bready-cat" : "bready-cat-dev";

const STORAGE_BASE_URL = "https://storage.cloud.google.com";

// NOTE(HAECHAN): GAS_PRICE for Prod will change;
const GAS_PRICE = isProd ? 0.0005 * 1e6 : 0.0005 * 1e6; // we will use 0.0005ain (1 ain == 1e6)

const CAT_TYPES = ["allblack", "chaos", "cheese", "mackerel", "milkcow", "threecolor", "tuxedo"];

module.exports = {
    DISCORD_MOCK_ID,
    BUCKET_NAME,
    STORAGE_BASE_URL,
    SEED_RANGE,
    GAS_PRICE,
    CAT_TYPES,
};
