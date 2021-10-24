const { App } = require('@slack/bolt');
const messageHandler = require('./tools/message-handler.js');
const eventHandler = require('./tools/event-handler.js');
const slashHandler = require('./tools/slash-handler.js')
require('dotenv').config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN // add this
});

app.message('hello', messageHandler.hello);
app.message(':rocket:', messageHandler.rocket);

app.event('reaction_added', eventHandler.reaction_added);
app.event('app_home_opened', eventHandler.app_home_opened);

app.command('/howto', slashHandler.howto);
app.command('/log', slashHandler.log);

app.action('approve_button', async ({ ack, say }) => {
  await ack();
  // Update the message to reflect the action
  await say('Request approved 👍');
});

app.action(/^log/, async ({ ack, say, payload }) => {
  await ack();
  // Update the message to reflect the action
  console.log(`got press from button:\n${JSON.stringify(payload, null, 4)}`);
  await say('got a button press');
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! on port', (process.env.PORT || 3000));
})();