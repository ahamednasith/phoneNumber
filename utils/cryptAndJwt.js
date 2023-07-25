const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const crypto = require('crypto');

const verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];
    if(token){
        token = token.slice(7);
        jwt.verify(token,config.secret,(err,decoded) => {
            if(err){
                return res.status(404).json({message:"Unauthorized"});
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(400).json({message:"Access Denied!"});
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
