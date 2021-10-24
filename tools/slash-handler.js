const airtableUtilities = require('./airtable-utilities')
const randomLogger = require('./data/random-logger.js')

exports.howto = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    const airtableResult = await airtableUtilities.findByValue({
        baseId: process.env.AIRTABLE_BOT_BASE_ID,
        table: "HowTos",
        maxRecords: 1,
        view: "MAIN",
        field: "Name",
        value: command.text
    })
    const blocks = [
        {
            "type": "image",
            "image_url": airtableResult[0].fields.ImageLink,
            "alt_text": airtableResult[0].fields.Name
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `how to ${airtableResult[0].fields.Name}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": airtableResult[0].fields.Notes
            }
        }
    ]
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        blocks: blocks
    })
}

exports.log = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    console.log(`heard log slash:\n${JSON.stringify(command, null, 4)}`)
    const terms = command.text.split(" ")
    const elements = []
    for (let index = 0; index < terms.length; index++) {
        elements.push({
            "type": "button",
					"text": {
						"type": "plain_text",
						"text": terms[index],
						"emoji": true
					},
					"value": `log_${terms[index]}`,
					"action_id": `log_action_${terms[index]}`
        })   
    }
    const blocks = [
        {
            "type": "image",
            "image_url": randomLogger(),
            "alt_text": "logger"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `here's your logger`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `we'll be setting up buttons for these words:\n\t${command.text}`
            }
        },
        {
			"type": "actions",
			"elements": elements
		}
    ]
    
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        text: "if you see this, the logging machine can't work in this context",
        blocks: blocks
    })
}