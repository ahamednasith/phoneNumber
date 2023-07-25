const Joi = require('joi');

const schema =Joi.object({
    user_Id: Joi.number().min(10000000).max(99999999),
    phoneNumber: Joi.number().min(1000000000).max(9999999999),
    signUpDate:Joi.date().iso(),
    loginDate:Joi.date().iso()
});

const validate = (req,res,next) =>{
    const phoneNumber = req.body.phoneNumber;
    const user_Id = Math.floor(10000000 + Math.random() * 90000000);
    const signUpDate = new Date();
    const loginDate  = new Date();
    const {error} = schema.validate({phoneNumber,user_Id,signUpDate,loginDate});
    if(error){
        return res.status(402).json({error:error.message});
    }
    next();
}

module.exports ={validate};
