const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    PAYMENT: Symbol("payment"),   
    FOODTYPE: Symbol("foodtype"),
    NOODLE: Symbol("noodle"),
    SALAD: Symbol("noodle"),
    BBQ: Symbol("bbq") 
});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "Noodle";
        this.foodtype ="",
        this.bbq = "",
        this.salad = "",
        this.noodle = ""; 
        this.pOrder = 0;
        this.pNoodle = 0;
        this.pSalad = 0;
        this.pBbq = 0;
        this.pTopping = 4;
        this.pDrink = 0;
        this.total=0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
               this.stateCur = OrderState.FOODTYPE;            
                aReturn.push("Welcome to Allen's restaurant.");
                aReturn.push("What would you like? Noodle/Bbq/Salad？");
                break;
            // case OrderState.SIZE:
            //     this.stateCur = OrderState.TOPPINGS
            //     this.sSize = sInput;
            //     aReturn.push("What toppings would you like?");
            //     break;
            // case OrderState.TOPPINGS:
            //     this.stateCur = OrderState.DRINKS
            //     this.sToppings = sInput;
            //     aReturn.push("Would you like drinks with that?");
            //     break;
            // case OrderState.DRINKS:
            //     this.stateCur = OrderState.PAYMENT;
            //     this.nOrder = 15;
            //     if(sInput.toLowerCase() != "no"){
            //         this.sDrinks = sInput;
            //     }
            case OrderState.FOODTYPE:
                this.foodtype = sInput;
                console.log(this.foodtype);
                switch(this.foodtype.toLowerCase()){
                    case "noodle":
                        this.stateCur = OrderState.SIZE;
                        this.noodle = sInput
                        aReturn.push("What size would you like?");
                        aReturn.push("Large, medium, or small?");
                        break;
                    case "bbq":
                        this.stateCur = OrderState.BBQ;
                        aReturn.push("What kind of bbq do you like?");
                        aReturn.push("Pork, beef, or vegetable");
                        break;
                    case "salad":
                        this.stateCur = OrderState.SALAD;
                        aReturn.push("What kind of salad do you like?");
                        aReturn.push("Salmon, Vegan, or fish?");   
                        break;
                    default:
                        aReturn.push("Please choose the listed food!");
                        break;
                }            
                break;
            case OrderState.SALAD:
                this.salad = sInput;
                this.sItem = "salad";
                if(this.salad == "")
                {
                    this.stateCur = OrderState.SALAD;
                    aReturn.push("What kind of salad do you like?");
                    aReturn.push("Salmon, Vegan, or fish?");                          
                    break;
                }else {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                    break;
                }
            case OrderState.BBQ:
                this.bbq = sInput;
                this.sItem = "bbq";
                if(this.bbq == "")
                {
                    this.stateCur = OrderState.BBQ;
                    aReturn.push("What kind of bbq do you like?");
                    aReturn.push("Pork, beef, or vegetable");
                    break;
                }else {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                    break;
                }           
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if(this.sSize.toLowerCase()=="large")
                {
                    this.pNoodle = 5;
                }else if (this.sSize.toLowerCase()=="medium"){
                    this.pNoodle = 4;
                }else if (this.sSize.toLowerCase()=="small")
                {
                    this.pNoodle = 3;
                }else{
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Please put in the right size!");
                    break;
                }
                console.log(this.sSize);
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                console.log(sInput);
                aReturn.push("Would you like drink with that?(yes/no)");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.pDrink = 2;}
               
                if(this.bbq.toLowerCase()=="Pork")
                {
                    this.pBbq = 9;
                }else if (this.bbq.toLowerCase()=="beef"){
                    this.pBbq = 11;
                }else if(this.bbq.toLowerCase()=="vegetable")
                {
                    this.pBbq = 4;
                }else {
                    aReturn.push("Please put in the right BBQ!");
                    this.stateCur = OrderState.BBQ;
                    
                    break;
                }
                if(this.salad.toLowerCase()=="salmon")
                {
                    this.pSalad = 13;
                }else if (this.salad.toLowerCase()=="vegan"){
                    this.pSalad = 12;
                }else 
                {
                    this.pSalad = 8;
                } 

                aReturn.push("Thank-you for your order of");
                aReturn.push("---Details:---");
                // let this.total = 0;
                if(this.noodle !="")
                {
                    aReturn.push(`Noodle, ${this.sSize}  ${this.pNoodle}$`);
                    this.total = this.pNoodle;
                }
                if(this.salad!="")
                {
                    aReturn.push(`Salad,  ${this.salad}  ${this.pSalad}$`);                    
                    this.total += this.pSalad;
                }
                if(this.bbq!="")
                {
                    aReturn.push(`Bbq,  ${this.bbq}  ${this.pBbq}$`);
                    this.total += this.pBbq;
                }
                aReturn.push(`Toppings, ${this.sToppings}  ${this.pTopping}$`);
                this.total += this.pTopping;

                if(this.sDrinks.toLowerCase() == "yes")
                {
                    this.total += this.pDrink;
                    aReturn.push(`Drinks, ${this.sDrinks}  ${this.pDrink}$`);
                }        
                aReturn.push("---Summary:---");
                aReturn.push(` Thank-you for your order of ${this.sSize} ${this.sItem} with ${this.sToppings}.  `);
                if(this.sDrinks){
                    aReturn.push(`And also with drink : ${this.sDrinks}`);
                }
                aReturn.push(`Total Amount: ${this.total}`);

                aReturn.push("---------");
                aReturn.push(`Please pay for your order here`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;
            case OrderState.PAYMENT:
                console.log(sInput);
                this.isDone(true);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.total = sTitle;
      }
      if(sAmount != "-1"){
        this.total = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
      
      
      'put your client id here for testing ... Make sure that you delete it before committing'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.total}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.total}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}