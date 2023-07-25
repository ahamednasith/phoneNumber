const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');

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

module.exports = {verifyToken};
