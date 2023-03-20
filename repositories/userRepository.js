const baseRepository = require('./baseRepository');

class userRepository extends baseRepository {}

module.exports = new userRepository('user');
