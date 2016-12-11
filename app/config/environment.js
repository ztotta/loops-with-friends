var _ = require('lodash');

var localEnvVars = {
  TITLE:      "Loops W/ Friends",
  SAFE_TITLE: 'loops_w_friends',
  superSecret: "looptyloobetterwithtwo"
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
