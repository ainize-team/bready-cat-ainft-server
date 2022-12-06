const axios = require("axios");
const { DISCORD_MOCK_ID, SEED_RANGE } = require("./const");
const { getRandomInt } = require("./util");

const defaultDto = {
    discord: {
        user_id: DISCORD_MOCK_ID,
        guild_id: DISCORD_MOCK_ID,
        channel_id: DISCORD_MOCK_ID,
        message_id: DISCORD_MOCK_ID,
    },
    params: {
        prompt: "write your prompt",
        steps: 30,
        // random seed
        seed: 1,
        width: 768,
        height: 768,
        images: 1,
        guidance_scale: 7.5,
        model_id: "stable-diffusion-v2",
    },
};

const createTask = async (prompt) => {
    // FIXME(haechan@comcom.ai): this expression just overwrite previous dto
    defaultDto.params.prompt = prompt;
    defaultDto.params.seed = getRandomInt(SEED_RANGE);

    const res = await axios.post(`${process.env.TTA_HOST}/generate`, defaultDto);
    return res.data;
};

const getCompletedTask = (taskId) => {
    return new Promise((resolve, reject) => {
        // polling every second
        let task;
        let timerId = setInterval(async () => {
            task = await axios.get(`${process.env.TTA_HOST}/tasks/${taskId}/images`);
            if (task.status === 200 && task.data.status === "completed") {
                resolve(task.data);
                clearInterval(timerId);
            }
        }, 1_000);

        // throw Timeout Error after 5 minutes
        setTimeout(() => {
            reject(new Error(`Timeout: taskId(${taskId}), response(${task})`));
        }, 300_000);
    });
};

module.exports = {
    createTask,
    getCompletedTask,
};
