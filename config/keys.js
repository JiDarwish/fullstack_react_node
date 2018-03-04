// figure out what environment you're in

if (process.env.NODE_ENV === 'production') {
  // procution return the production keys
  module.exports = require('./prod');
} else {
  // developement return the developement keys
  module.exports = require('./dev');
}
