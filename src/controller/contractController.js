const { validateTokenId } = require("../util/validator");
const { getMetadataByTokenId } = require("../service/contractService");
const getMetadata = async (req, res) => {
    const tokenId = Number(req.params.tokenId);
    try {
        validateTokenId(tokenId);
    } catch (e) {
        console.error(e);
        return res.status(400).send(e.message);
    }

    const metadata = await getMetadataByTokenId(tokenId);

    return res.status(200).json(metadata);
};

module.exports = {
    getMetadata,
};
