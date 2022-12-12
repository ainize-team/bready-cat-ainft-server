const Ain = require("@ainblockchain/ain-js").default;
const { isProd } = require("./const");
// @see https://docs.ainetwork.ai/ain-blockchain/developer-guide/tools/ainize-trigger/project-deployer

// Ainize set env ainetwork provider url as "PROVIDER_URL"
const blockchainEndpoint = process.env.PROVIDER_URL;
const chainId = isProd ? 1 : 0;
const ain = new Ain(blockchainEndpoint, chainId);

// Ainize set env ainetwork wallet private key as "AINIZE_INTERNAL_PRIVATE_KEY"
const privateKey = `${process.env.AINIZE_INTERNAL_PRIVATE_KEY}`;
ain.wallet.addAndSetDefaultAccount(privateKey);

module.exports = ain;
