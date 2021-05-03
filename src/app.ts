import { App } from "@slack/bolt";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event("app_home_opened", async ({ event, client }) => {
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        callback_id: "home_view",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Hello :wave:*",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "If you see this, the bot is working. Yay!",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(((process.env.PORT as unknown) as number) || 3000);
  console.log("🎲 Game Night for Slack is running. Enjoy your game nights!");
})();
