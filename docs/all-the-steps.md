# the steps

to make this thing. just the steps, not much explanation.

## start your app

basically getting to hello world.

* create repo. on github, for instance, then `git clone https://github.com/you/your-app.git`
* `npm init` and just go with defaults, your name, MIT
* `npm i @slack/bolt`
* `npm i dotenv` and `touch .env`
* create slack app at api.slack.com
    * add to development slack instead of your organization's slack
    * first choose scopes in oauth and permissions tab. you'll want
        * `channels:history` = must have
        * `channels:read` = must have
        * `chat:write`
        * `groups:history`
        * `groups:read`
        * `im:history`
        * `mpim:history`
        * `pins:read`
        * `pins:write`
        * `reactions:read`
        * `reactions:write`
        * `users:read`
        * and maybe others
    * then install app to workspace
    * then turn on socket mode to generate an App Token (give it a name you'll remember when you are prompted)
* At this point you have the three tokens you need to add to your `.env` file
```
SLACK_BOT_TOKEN=xoxb-etc-etc-etc
SLACK_APP_TOKEN=xapp-etc-etc-etc
SLACK_SIGNING_SECRET=etc-etc-etc
```
* create app.js with basic code (won't work until after next step though):
```
const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, 
    appToken: process.env.SLACK_APP_TOKEN 
});

app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log(`heard a hello: \n${JSON.stringify(message, null, 4)}`)
    await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running! on port', (process.env.PORT || 3000));
})();
```
* then (for that code to work) make sure that you are "listening" for message events (and any others you want). Go to Event Subscriptions and subcribe to as many as you want, but you'll probably want at least these:
    * app_home_opened
    * message.channels
    * message.im
    * message.mpim
    * reaction_added
    * reaction_removed
* `npm i -g nodemon` 
* `nodemon app.js` to start server (you can create a `dev` or `devstart` script for this in your `package.json`)
* now you should be able to invite the app to a channel and say "hello" and then get a result

## SPLIT YOUR CODE INTO FILES

there are a couple of ways you might choose to divide things up:

If you want to handle all the different stuff Slack sends your way (and the stuff you send slack) in different files for different sorts of operations, you might want to create a `message-handler.js` file and paste the function you're passing to `app.message` in there:
```
exports.hello = async ({ message, say }) => {
    console.log(`heard a hello`)
    await say(`Hey there <@${message.user}>!`);
}
```
then require this back in your app.js
```
const messageHandler = require('./tools/message-handler.js');

// and then

app.message('hello', messageHandler.hello);
```
You'd then add in a file for `slashHandler` and `actionHandler` etc etc.

The other way to do it would be to enclose all of the logic for a specific workflow or project in a file, which could make sense for us. So instead of a file for each type of Slack interaction, we'd have a file (or more likely a folder) for a given workflow, like the "logger" tool we'll make later, and within logger you'd have

```
exports.handleSlash = async ({command, ack, client}) => {
    // etc
};

exports.handleAction = async ({ack, payload, client}) => {
    // etc
};

// etc
```




### ACTIONS

* add log actions to Airtable


### EVENTS

* add emoji events to Airtable


