const axios = require("axios");
const { SEED_RANGE } = require("../const");
const { generateRandomInt } = require("../util/util");

DISCORD_MOCK_ID = process.env.DISCORD_MOCK_ID;

class TextToArtDto {
    discord = {
        user_id: DISCORD_MOCK_ID,
        guild_id: DISCORD_MOCK_ID,
        channel_id: DISCORD_MOCK_ID,
        message_id: DISCORD_MOCK_ID,
    };

    constructor(params) {
        this.params = params;
    }
}

const createTask = async (params) => {
    const ttaDto = new TextToArtDto(params);

    const res = await axios.post(`${process.env.TTA_HOST}/generate`, ttaDto);
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

async function textToArt(prompt, seed = generateRandomInt(SEED_RANGE)) {
    const params = {
        prompt: prompt.positive,
        negative_prompt: prompt.negative,
        steps: 30,
        seed: seed,
        width: 768,
        height: 768,
        images: 1,
        guidance_scale: 7.5,
        model_id: "stable-diffusion-v2",
    };
    const { task_id: taskId } = await createTask(params, seed);
    console.log("taskId :>> ", taskId);

    const { result } = await getCompletedTask(taskId);
    console.log("result :>> ", JSON.stringify(result));

    return result[1].url;
}

module.exports = {
    createTask,
    getCompletedTask,
    textToArt,
};
