var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var sequelize = new Sequelize('postgres://foo:"bar"@localhost/test_db');

var User = sequelize.define('users', {
    userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
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
    }        
});

User.prototype.validPassword = function validPassword(password)
{
  return bcrypt.compareSync(password, this.password);
}

User.prototype.generateJWT = function generateJWT()
{
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    userId: this.userId,
    exp: parseInt(exp.getTime() / 1000),
  }, "secret");
}

User.prototype.toAuthJSON = function toAuthJSON()
{
  return {
    userId: this.userId,
    email: this.email,
    token: this.generateJWT(),
  };
}

sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => {
      console.log('This error occured', error);})

module.exports = User;