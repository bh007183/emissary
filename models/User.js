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
            validate:{
                allowNull: false,
                unique: true,
                isEmail: {
                    msg: "Must be valid email."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate:{
                len: {
                    args: [2,10],
                    msg: "Length must be longer than 2 and less than 10"
                }
            }

        }

    })
    User.associate = function(models){
        User.hasMany(models.Message)
        // User.hasMany(models.Room, {onDelete: "cascade", hooks:true})
        User.belongsToMany(User, {through: "Friends", constraints: true, onDelete: "cascade", hooks:true})
    }
    return User
}