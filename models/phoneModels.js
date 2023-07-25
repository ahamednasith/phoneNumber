module.exports = (sequelize,DataTypes) => {
    const Contact = sequelize.define('contact',{
        user_Id:{
            type: DataTypes.INTEGER
        },
        phoneNumber:{
            type: DataTypes.STRING
        },
        signUpDate:{
            type: DataTypes.DATE
        },
        loginDate:{
            type:DataTypes.DATE
        }
    },{
        timestamps: false
    });
    return Contact;
}