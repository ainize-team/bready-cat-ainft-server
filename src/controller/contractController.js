const { validateTokenId } = require("../util/validator");

const getMetadata = async (req, res) => {
    const defaultDto = {
        name: `AINFT #${tokenId}`,
        description: "This is the best AINFT ever!",
        image: "https://storage.googleapis.com/nft-server-dev.appspot.com/ainft-test/wow.gif",
        attributes: [
            {
                trait_type: "Example Trait 1",
                value: "Nice",
            },
            {
                trait_type: "Example Trait 2",
                value: "Much wow",
            },
        ],
    };
    const tokenId = Number(req.params.tokenId);
    validateTokenId(tokenId);

    return res.status(200).json(defaultDto);
};

module.exports = {
    getMetadata,
};
