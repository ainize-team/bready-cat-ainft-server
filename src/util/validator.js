const validateTransaction = (tx) => {
    if (!tx || !tx.tx_body || !tx.tx_body.operation) {
        throw new Error(`Invalid tx: ${JSON.stringify(tx)}`);
    }
    if (tx.tx_body.operation.type !== "SET_VALUE") {
        throw new Error(`Not supported tx type: ${tx.tx_body.operation.type}`);
    }
};
const validateTokenId = (tokenId) => {
    if (isNaN(tokenId) || tokenId <= 0) {
        throw new Error(`Request for an invalid tokenId: ${tokenId}`);
    }
};
module.exports = {
    validateTransaction,
    validateTokenId,
};
