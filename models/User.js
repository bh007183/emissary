const bcrypt = require("bcrypt")
const salt = 10
module.exports = function(sequelize, DataTypes){
    const User = sequelize.define("User",{
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: {
                    msg: "Must be valid email."
                },
                isUnique: function(value, next){
                    User.findOne({
                      where : {
                        email:value
                      }
                    }).then(function(result){
                      if(result === null){
                        return next()
                      }else{
                        return next('There is already an account associated with this email address.')
                      }
                    }).catch(err =>{
                        return next()
                    })
            }
        },
    },
        password: {
            type: DataTypes.STRING,
            validate:{
                len: {
                    args: [4,100],
                    msg: "Length must be longer than 2 and less than 10"
                }
            }

        },
        socketId:{
            type: DataTypes.STRING,
            allowNull: false

        },
        firsttime: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

    })
    User.beforeCreate(async (user) => {
        const hashed = await bcrypt.hashSync(user.password, salt)
        
        user.password = hashed
        
    })
    User.beforeUpdate(async (user) => {
        const hashed = await bcrypt.hashSync(user.password, salt)
        
        user.password = hashed
        
    })
    User.associate = function(models){
        User.hasMany(models.Message)
        User.belongsToMany(models.Room, {As: "RoomToUser", through: "RoomToUser", constraints: true, onDelete: 'cascade', hooks: true})
        User.belongsToMany(User, {as: "Friends", through: "UserToUser", constraints: true, onDelete: "cascade", hooks:true})
    }
    return User
}