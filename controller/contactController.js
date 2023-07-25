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
        const newContact = await Contact.update({loginDate},{where:{phoneNumber}});
        return res.status(200).json({message:"PhoneNumber exists And loginDate Updated"});
    } else {
        const contact = await Contact.create({
            user_Id,
            phoneNumber,
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
    const contact = await Contact.findOne();
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