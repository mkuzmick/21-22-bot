const airtableTools = require('./airtable-tools')

exports.logRe = /^log/

exports.handleLog = async ({ ack, say, payload }) => {
    await ack();
    // Update the message to reflect the action
    console.log(`got press from button:\n${JSON.stringify(payload, null, 4)}`);
    await say(`got a button press. \n\nblock_id = \`${payload.block_id}\`. action_id = \`${payload.action_id}\`. value = \`${payload.value}\`. action_ts = \`${payload.action_ts}\`.`);
}