var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var sequelize = new Sequelize('postgres://postgres@localhost/DB');

var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      generateJWT: function() {
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 60);
      
        return jwt.sign({
          id: this._id,
          username: this.username,
          exp: parseInt(exp.getTime() / 1000),
        }, secret);
      },
      toAuthJSON: function(){
        return {
          username: this.username,
          email: this.email,
          token: this.generateJWT(),
        };
      }
    }    
});

sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User;