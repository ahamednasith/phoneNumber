const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dateTime = require('date-and-time');
const db = require('../models/index');
const { log } = require('console');
const { decode } = require('punycode');
const Contact = db.contact;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (token) {
        token = token.slice(7);
        const decodedToken = jwt.decode(token);
        const user_Id = decodedToken.id;
        console.log(user_Id);
        
        Contact.findOne({ where: { id: user_Id } }).then(contact => {
            if (contact) {
                const date = contact.loginDate;
                req.loginDate = date.toISOString().replace("T", " ").slice(0, 19);
                console.log(req.loginDate);
                jwt.verify(token, req.loginDate, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: "Unauthorized", err });
                    }
                    req.decoded = decoded;
                    next();
                });
            }
        });
    } else {
        return res.status(401).json({ message: "Access Denied" });
    }
};



const algorithm = "aes-256-cbc";
const key = "B374A26A71490437AA024E4FADD5B49F";
const iv = "7E892875A42C59A3";

function encrypt(value){
    let cipher = crypto.createCipheriv(algorithm,key,iv);
    let encrypted = cipher.update(value,'utf-8','hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decrypt(value){
    let decipher = crypto.createDecipheriv(algorithm,key,iv);
    let decrypted = decipher.update(value ,'hex','utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {verifyToken,encrypt,decrypt};