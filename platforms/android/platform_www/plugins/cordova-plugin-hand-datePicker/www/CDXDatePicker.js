cordova.define("cordova-plugin-hand-datePicker.CDXDatePicker", function(require, exports, module) {
//调用方法 CDXDatePicker

var exec = require('cordova/exec');
// arg1: 成功回调
// arg2: 失败回调
// arg3: 标题
// arg4: 开始日期
// arg5: 结束日期
// arg6: picker 类型
module.exports = {
	selectDate: function (successCallBack, errorCallBack, data) {
		exec(successCallBack,errorCallBack, "CDXDatePicker", "selectDate", [data]);
	}
};



});
