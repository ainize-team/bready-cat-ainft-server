const { CAT_TYPES } = require("../const");
const bucket = require("../external/bucket");

const getMetadataByTokenId = async (tokenId) => {
    const typeSize = CAT_TYPES.length;
    const catType = CAT_TYPES[(tokenId - 1) % typeSize];
    const file = await bucket.file(`v1/NFT_metas/${catType}.json`).download();
    return JSON.parse(file[0].toString("utf8"));
};

module.exports = {
    getMetadataByTokenId,
};
