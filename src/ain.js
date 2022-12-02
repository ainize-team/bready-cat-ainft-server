const Ain = require("@ainblockchain/ain-js").default;
const dotenv = require("dotenv");
const { isProd, NETWORK_NAME } = require("./const");

dotenv.config();
const provideUrl = `https://${NETWORK_NAME}-api.ainetwork.ai`;
const ain = new Ain(provideUrl, isProd ? 1 : 0);
const myAddress = ain.wallet.addAndSetDefaultAccount(`${process.env.PRIVATE_KEY}`);

const setFunction = async (appName, path, _function) => {
    const appPath = `/apps/${appName}`;
    // Set a function to be triggered when writing values at the functionPath.
    const functionPath = `${appPath}/${path}`;
    return ain.db.ref(functionPath).setFunction(_function);
};

const setValue = async (appName, path, value) => {
    const setPath = `/apps/${appName}/${path}`;
    return ain.db.ref(setPath).setValue(value);
};

const getValue = async (appName, path) => {
    const getPath = `/apps/${appName}/${path}`;
    return ain.db.ref(getPath).getValue();
};

module.exports = {
    setFunction,
    setValue,
    getValue,
};
