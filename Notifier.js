class Notifier {
    /*
        receiver stratagy is used for retreiving and array of receivers
        and reciever messages for sending.
        sender stratagy is used for sending the messages.
    */
    constructor(senderStratagy, receiverStratagy) {
        this.stratagy = senderStratagy
        this.receiverStratagy = receiverStratagy
    }

    async notify() {

        let receivers = await this.receiverStratagy.getReceivers()

        

        receivers.forEach(receiver => {

            var productList = "";

            receiver.products.forEach(product => {
                productList += "- " + product.selectedQuantity + " " + product.productName + "<br>"
            })

            const message = `Hello ${receiver.name},<br>Its been ${receiver.daysSinceEndDate} since your return date, please contact the positive warehouse administration and return the products as soon as possible!<br>Your order: <br>${productList}<br>Thank you.`


            this.stratagy.SendEmail(receiver.mail, receiver.name, "natanprotector@outlook.com", "Positive Warehouse", message, "Notification")

        });
   
    }

}

module.exports = Notifier