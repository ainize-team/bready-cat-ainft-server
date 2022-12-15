const Ain = require("@ainblockchain/ain-js").default;
const { isProd, GAS_PRICE } = require("../const");
// @see https://docs.ainetwork.ai/ain-blockchain/developer-guide/tools/ainize-trigger/project-deployer

// Ainize set env ainetwork provider url as "PROVIDER_URL"
const blockchainEndpoint = process.env.PROVIDER_URL;
const chainId = isProd ? 1 : 0;
const ain = new Ain(blockchainEndpoint, chainId);

// Ainize set env ainetwork wallet private key as "AINIZE_INTERNAL_PRIVATE_KEY"
const privateKey = `${process.env.AINIZE_INTERNAL_PRIVATE_KEY}`;
ain.wallet.addAndSetDefaultAccount(privateKey);

const parseRef = (ref) => {
    if (!ref) {
        return [];
    }

    return ref.split("/").filter((node) => {
        return !!node;
    });
};

const formatRef = (parsedRef) => {
    if (!Array.isArray(parsedRef) || parsedRef.length === 0) {
        return "/";
    }
    let formatted = "";
    for (const label of parsedRef) {
        formatted += "/" + String(label);
    }
    return (formatted.startsWith("/") ? "" : "/") + formatted;
};

const write = async (path, value) => {
    const res = await ain.db.ref(path).setValue({ value, nonce: -1, gas_price: GAS_PRICE });
    if (res["result"]["message"] !== undefined) {
        throw new Error(JSON.stringify(res));
    }
    return res;
};

module.exports = {
    parseRef,
    formatRef,
    write,
};
