require("dotenv").config();

class ReceiverStratagy {

    constructor() {

        this.validator = require('validator');
        
        this.admin = require("firebase-admin");

        // Needs to be secret
        const firebaseConfig = require('../postivestorage-fdfff-firebase-adminsdk-q398b-1759e2a9a4')
          

        this.admin.initializeApp({
            credential: this.admin.credential.cert(firebaseConfig)
          });

        // Get a reference to the Firestore database
        this.db = this.admin.firestore();
    }


    validateEmail(email) {
        return this.validator.isEmail(email);
    }

    async getReceivers() {

        const allOrders = await this.getAllOrders();

        const lateOrders = [];
        
        allOrders.forEach((order) => {
            // check if order is late
            const daysSinceEndDate = this.daysSinceDate(order.endDate)
            
            if (this.daysSinceDate(order.endDate) != -1 && this.validateEmail(order.user.email)) {
                lateOrders.push({
                    mail: order.user.email,
                    name: order.user.name,
                    daysSinceEndDate: daysSinceEndDate,
                    products: order.products
                });
            }
        });

        return lateOrders;
    }


    // Function to retrieve all documents from the 'orders' collection
    async getAllOrders() {
        
        const orders = [];
        
        try {
            const ordersCollection = this.db.collection('orders');
            const snapshot = await ordersCollection.get();
        
            snapshot.forEach(doc => {
                orders.push({ id: doc.id, ...doc.data() });
            });
        } catch (error) {
            console.error('Error retrieving orders:', error);
        }

        return orders;
    }

    daysSinceDate(dateString) {
        // Parse the input date string
        const inputDate = new Date(dateString);
        const currentDate = new Date();

        // Set the input date to midnight and the current date to midnight
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
    
    
        // Check if the input date is in the future
        if (inputDate < currentDate) {
            return -1;
        }
    
        // Calculate the difference in time
        const differenceInTime = inputDate - currentDate;
    
        // Convert the difference in time to days
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    
        return differenceInDays;
    }

}


module.exports = ReceiverStratagy