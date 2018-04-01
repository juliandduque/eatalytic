const lib = require('lib')({ token: process.env.STDLIB_TOKEN })

/**
* Send an SMS message via MessageBird
* @param {string} recipient The phone number that will receive the SMS
* @param {string} body The contents of the SMS
* @returns {any}
*/
module.exports = async (recipient, body) => {

    const sms = lib.messagebird.sms['@0.1.3'];

    let result = await sms.create({
        recipient: recipient, // (required)
        body: body // (required)
    });
}
