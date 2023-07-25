const db = require ('../models');
const { Sequelize, Op } = require('sequelize');
const schema = require('../validator/contactValidator');
const {encrypt,decrypt} = require('../cryption/contactCrypt');
const config = require('../config/authConfig');
const jwt = require('jsonwebtoken');
const Contact = db.contact;

const addAccess = async(req,res) => {
    const phoneNumber = req.body.phone;
    const user_Id = Math.floor(10000000 + Math.random() * 90000000);
    const signUpDate = new Date();
    const loginDate  = new Date();
    const {error} = schema.validate({phoneNumber,user_Id,signUpDate,loginDate});
    if(error){
        return res.status(402).json({error:error.message});
    }
    const exists = await Contact.findOne({where:{user_Id}});
    if(exists){
        const newContact = await Contact.update({loginDate},{where:{user_Id}});
    } else {
       const contact = await Contact.create({
            user_Id,
            phoneNumber:encrypt(String(phoneNumber)),
            signUpDate,
            loginDate
        });
        var token = jwt.sign({id:contact.id},config.secret);
        res.status(200).send({
            message:"Contact Successfully Added",
            accesstoken:token
        });
    }
}
const getContact = async(req,res) =>{
    const contact = await Contact.findOne({id:req.params.id});
    const user_Id = contact.user_Id;
    const phoneNumber = decrypt(contact.phoneNumber);
    return res.status(200).send({
        id:contact.id,
        user_Id,
        phoneNumber
    })
}

const getAllContact = async(req,res) =>{
    const contact = await Contact.findAll();
    const decryptedContacts = contact .map(contact => {
        return {
            id: contact.id,
            user_Id: contact.user_Id,
            phoneNumber: decrypt(contact.phoneNumber)
        };
    });
    return res.status(200).json(decryptedContacts);
}

module.exports = {addAccess,getContact,getAllContact};