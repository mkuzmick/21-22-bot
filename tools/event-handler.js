const rocketHandler = require('./rocket-handler')
const rainbowHandler = require('./rainbow-handler')

exports.reaction_added = async ({ event, client }) => {
  try {
    console.log(`got a reaction_added event: \n${JSON.stringify(event, null, 4)}`);
    if (event.reaction == "rocket") {
      rocketHandler({ event, client })
    } else if (event.reaction == "rainbow") {
      rainbowHandler({ event, client })
    }
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: event.item.channel,
      text: `got a :${event.reaction}:. Here's the JSON: \n${JSON.stringify(event, null, 4)}`
    });
    console.log(result);

  }
  catch (error) {
    console.error(error);
  }
}

exports.app_home_opened = async ({ event, client }) => {
  try {
    // Call views.publish with the built-in client
    console.log("app_home_opened");
    const result = await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        "type": "home",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome home, <@" + event.user + "> :house:*"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "A simple stack of blocks for the simple sample Block Kit Home tab."
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Action A",
                  "emoji": true
                }
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Action B",
                  "emoji": true
                }
              }
            ]
          }
        ]
      }
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}