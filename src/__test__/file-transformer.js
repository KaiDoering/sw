const path = require('path');

module.exports = {
  process(_, filename) {
    return {
      code: `module.exports = "${path.basename(filename)}"\n;exports.url = "${path.basename(filename)}";`,
    };
  },
};
