async function rocketHandler ({ event, client }) {
    console.log(`got a rocket--we'll do something with it`);
    console.log(JSON.stringify(event, null, 4));
    const theMessage = await client.conversations.history(
      {
        channel: event.item.channel,
        latest: event.item.ts,
        inclusive: true,
        limit: 1
      }
    )
    const result = await client.chat.postMessage({
        channel: event.item.channel,
        text: `now we're handling the rainbow. we found this for the original message:\n${JSON.stringify(theMessage, null, 4)}`
      });
      console.log(result);
}

module.exports = rocketHandler;