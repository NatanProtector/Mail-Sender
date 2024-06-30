const Mailjet = require('node-mailjet');

class SenderStratagy {

    constructor(MJ_API_KEY, MJ_API_SECRET) {
        this.mailjet = Mailjet.apiConnect(
            MJ_API_KEY,
            MJ_API_SECRET
        );
    }

    SendEmail(to_email, to_name, from_email, from_name, text, subject) {
        const request = this.mailjet.post('send', { version: 'v3.1' })
        .request({
            Messages:
            [
                {
                    From:
                    {
                        Email: from_email,
                        Name: from_name
                    },
                    To:
                    [
                        {
                            Email: to_email,
                            Name: to_name
                        }
                    ],
                    Subject: subject,
                    TextPart: text,
                    HTMLPart: "<h3>A message for you!</h3><br />" + text
                }
            ]
        });

        request.then((result) => {
            //console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        });
    }

}


module.exports = SenderStratagy