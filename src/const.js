const SEED_RANGE = 4_294_967_295;

const STORAGE_BASE_URL = "https://storage.cloud.google.com";

const GAS_PRICE = 0.0005 * 1e6; // we will use 0.0005ain (1 ain == 1e6)

const CAT_TYPES = ["allblack", "chaos", "cheese", "mackerel", "milkcow", "threecolor", "tuxedo"]; // Will be added next gen cats.

module.exports = {
    SEED_RANGE,
    STORAGE_BASE_URL,
    GAS_PRICE,
    CAT_TYPES,
};
