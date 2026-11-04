/* */
const express = require("express") ;
const app = express() ;
require("dotenv").config() ; 
const mongoose = require("mongoose") ; 
const user = require("./models/user_model.js");
const bcrypt = require("bcrypt") ;
const auth_route = require("./routes/auth_route.js")
const user_route = require("./routes/user_routes.js")
const ticket_route = require("./routes/ticket_route.js")

app.use(express.json());

/*make a connection to mongoDB*/ 

(async ()=>{ 

    try {
        await mongoose.connect( process.env.the_url)
        console.log('connection successfull');

        /*making a default user admin */

        const user1 = await user.findOne({userid : "admin"}) 
        if(!user1) { 
            console.log('no admin is there');

            const admin = await  user.create({
                name : "aman" , 
                userid : "admin" , 
                email : "admin@gmail.com" , 
                usertype : "ADMIN", 
                password: bcrypt.hashSync("welcome" , 8)   //8 ->It determines how computationally expensive the password hashing process will be

            })
            
        }
        else { 
            console.log('admin is present');
            
        }



        
    } catch (error) {
        console.log(error); 
        
        
    }
    
    




})()





app.use("/crm/api/v1" , auth_route)

app.use("/crm/api/v1" , user_route)

app.use("/crm/api/v1" , ticket_route)
 


app.listen(process.env.PORT, ()=>{
    console.log(`server staeted on the port ${process.env.PORT}`);
    
})