const airtableTools = require('./airtable-tools')

async function rocketHandler ({ event, client }) {
    console.log(`got a rocket--we'll do something with it`);
    console.log(JSON.stringify(event, null, 4));
    const historyResult = await client.conversations.history(
      {
        channel: event.item.channel,
        latest: event.item.ts,
        inclusive: true,
        limit: 1
      }
    )
    console.log(`history result:\n${JSON.stringify(historyResult, null, 4)}`);
    if (historyResult.messages && historyResult.messages.length > 0) {
      const theMessage = historyResult.messages[0];
      const result1 = await client.chat.postMessage({
        channel: event.item.channel,
        text: `now we're handling the rocket. we found this for the original message:\n${JSON.stringify(theMessage, null, 4)}`
      });
      console.log(result1);
      const airtableResult = await airtableTools.createRecord({
        record: {
          rocket_ts: event.event_ts,
          rocket_json: JSON.stringify(event, null, 4),
          original_ts: theMessage.ts,
          original_json: JSON.stringify(theMessage, null, 4)
        },
        baseId: process.env.AIRTABLE_BOT_BASE_ID,
        table: 'Rockets',
      })
      const result2 = await client.chat.postMessage({
        channel: event.item.channel,
        text: `just sent that record to airtable:\n${JSON.stringify(airtableResult, null, 4)}`
      });
    } else {
      console.log(`no message found`);
    }
}

module.exports = rocketHandler;