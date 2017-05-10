# 日期选择器插件

方法：
`selectDate(success, failure, data)`

## 参数说明

* 参数successCallBack  成功时的回调
* 参数errorCallBack  失败时的回调
* 参数data  传入的字符串

_ data 参数说明_

data 所需的参数为：

* startDate 开始日期
* endDate 结束日期
* startTime 开始时间
* endTime 结束时间
* title 标题
* type DatePicker 样式类型
* selectedDate 默认选中时间


参数 data 为日期选择器样式，默认样式如下：起始日期为当日，结束日期为 20 天之后，起始时间为 8:00，结束时间为 18:00，标题为取车时间，日期选择器样式为第一种，如果不传 data 值则按如上样式设置，如果传进去的参数缺少某字段则用默认值填充。

_ type 字段说明_

* TYPE1 : 月日 + 星期几+上或下午
* TYPE2 : 月日+星期几+时间
* TYPE3 : 月日+星期几

## 返回值
返回值为字符串，如："2016-11-11 上午"，如果取消选择，则返回失败回调，字符串为空。

# 插件调用示例

	var dic = {
	  startDate: "2016-11-12",
	  endDate: "2016-12-12",
	  startTime: "7:30",
	  endTime: "15:00",
	  selectedDate: "2016-12-1 8:30",
	  title: "TitleDemo",
	  type: "TYPE2"
	   }
	   CDXDatePicker.selectDate(success, failure, dic);
 