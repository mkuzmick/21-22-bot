exports.hello = async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
}

exports.rocket = async ({ message, say }) => {
    await say(`thanks for the :rocket:, <@${message.user}>`);
}