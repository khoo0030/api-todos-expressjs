const strings = require('../constants/exception/strings');

module.exports = {
  httpNotFound: {
    'message': strings.RESOURCE_NOT_FOUND
  },
  validationError: function (errors) {
    return {
      'message': strings.UNPROCESSABLE_ENTITY,
      'errors': errors
    }
  }
};
