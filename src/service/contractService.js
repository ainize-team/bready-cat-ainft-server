const { CAT_TYPES } = require("../const");
const bucket = require("../external/bucket");

/**
 * return metadata about cat from storage (rotate in cat type order)
 * @param {number} tokenId
 * @returns nft metadata object
 */
const getMetadataByTokenId = async (tokenId) => {
    const typeSize = CAT_TYPES.length;
    const catType = CAT_TYPES[(tokenId - 1) % typeSize];
    const file = await bucket.download(`v1/NFT_metas/${catType}.json`);
    return JSON.parse(file[0].toString("utf8"));
};

module.exports = {
    getMetadataByTokenId,
};
