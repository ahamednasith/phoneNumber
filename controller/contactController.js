const db = require ('../models');
const { Sequelize, Op } = require('sequelize');
const {encrypt,decrypt} = require('../utils/cryptAndJwt');
const config = require('../config/authConfig');
const jwt = require('jsonwebtoken');
const Contact = db.contact;

const addAccess = async(req,res) => {
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const user_Id = Math.floor(10000000 + Math.random() * 90000000);
    const signUpDate = new Date();
    const loginDate  = new Date();
    
    const exists = await Contact.findOne({
        where:{phoneNumber:phoneNumber}
        });
    if(exists){
        await Contact.update({loginDate},{where:{phoneNumber}});
        const updatedContact = await Contact.findOne({
            where: { phoneNumber: phoneNumber }
        });
        var token = jwt.sign({ id: updatedContact.id}, config.secret,{expiresIn:300});
        return res.status(200).json({message:"PhoneNumber exists And loginDate Updated",accesstoken:token});
    } else {
        const contact = await Contact.create({
            user_Id,
            phoneNumber,
            signUpDate,
            loginDate
        });
        var token = jwt.sign({id:contact.id},config.secret,{expiresIn:300});
        res.status(200).send({
            message:"Contact Successfully Added",
            accesstoken:token
        });
    }
}

const getContact = async(req,res) =>{
    const contact = await Contact.findByPk(req.decoded.id);
    return res.status(200).json({
        id:contact.id,
        user_Id:contact.user_Id,
        phoneNumber:decrypt(contact.phoneNumber)
    })
}


module.exports = {addAccess,getContact};