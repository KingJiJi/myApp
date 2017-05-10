cordova.define("cordova-plugin-encryption.Encryption", function(require, exports, module) {
var exec = require('cordova/exec');
module.exports = {
	encryptWithString: function (successCallback, errorCallback, data) {
		exec(successCallback, errorCallback, 'Encryption', 'encryptWithString', [data]);
	},
    decryptWithString: function (successCallback, errorCallback, data) {
		exec(successCallback, errorCallback, 'Encryption', 'decryptWithString', [data]);
	}
};


});
