const { MailtrapClient } = require("mailtrap");
require('dotenv').config();

const MAILTRAP_TOKEN = 'f6939fac270b1159c1de3b62552adfa4'

const mailtrapClient = new MailtrapClient({
  token: MAILTRAP_TOKEN
});

// console.log(MAILTRAP_TOKEN)

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mohammad Arkan",
};

module.exports = { mailtrapClient, sender }