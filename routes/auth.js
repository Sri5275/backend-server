const router = require("express").Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const Joi = require("joi");

//Login Route

router.post("/", async(req,res) => {
    try{
        //validate request body
        const{error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        // Check for existing user
        const user = await User.findOne({email:req.body.email});
        if(!user)
            return res.status(401).send({message:"Invalid Email or Password"});        
        // Compare Passwords
        const validPassword = await bcrypt.compare( req.body.password, user.password);
        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"});
        // Generate token and respond
        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successfully"});
    }catch(error){
        console.error(error) // Log the error for debugging
        res.status(500).send({message:"Internal Server Error"});
    }
})

const validate = (data) =>{
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router;