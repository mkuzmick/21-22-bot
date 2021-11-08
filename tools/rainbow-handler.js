async function rainbowHandler ({ event, client }) {
    console.log(`got a rocket--we'll do something with it`);
    console.log(JSON.stringify(event, null, 4));
    const result = await client.chat.postMessage({
      channel: event.item.channel,
      text: `now we're handling the rainbow`
    });
    console.log(result);
}

module.exports = rainbowHandler;