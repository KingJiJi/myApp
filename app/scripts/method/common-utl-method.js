/**
 * Created by wolf on 2016/6/12.
 * @author:wen.dai@hand-china.com
 */

'use strict';

/**
 * 打印--console--level
 */
var log = console.log.bind(console);
var warn = console.warn.bind(console);
var error = console.error.bind(console);

//格式化json
function jsonFormat(newParam) {
  var Json = angular.toJson(newParam, true);
  return Json;
};

//获取当前的年月日 日期
function getCurrentDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)
  var seperator = "-";
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myCurrentDate = year.toString() + seperator + month.toString() + seperator + day.toString();
  return myCurrentDate;
};

//获取上个月的月末
function getLastMonthDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)

  var year = now.getFullYear();       //年
  var month = now.getMonth();     //月
  var newDate = new Date(year, month, 1);
  var day = new Date(newDate.getTime() - 1000 * 60 * 60 * 24).getDate(); //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myLastMonthDate = year.toString() + month.toString() + day.toString();
  return myLastMonthDate;
};

//获取当前月的月末
function getCurrentMonthLastDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var newDate = new Date(year, month, 1);
  var day = new Date(newDate.getTime() - 1000 * 60 * 60 * 24).getDate(); //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myCurrentMonthLastDate = (year.toString() + month.toString() + day.toString());
  return myCurrentMonthLastDate;
};

//获取月和日
function getMonthDay(newDate) {
  var newMonthDay = newDate.substring(4, 6) + "月" + newDate.substring(6, 8) + "日";
  return newMonthDay;
};

/**
 ​ *  下面是去重的3个写法
 ​ *  @1：最常规
 ​ *  @2：思路好，但是性能差点
 ​ *  @3：更好的  --推荐
 *  @4：更复杂，适应性更广的
 ​ */

//@1:
function unique_normal(arr) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (ret.indexOf(item) === -1) {
      ret.push(item);
    }
  }
  return ret;
};

//@2:
var indexOf = [].indexOf ?
  function (arr, item) {
    return arr.indexOf(item);
  } :
  function indexOf(arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  };

function unique(arr) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (indexOf(ret, item) === -1) {
      ret.push(item);
    }
  }
  return ret;
};

//@3: 支持数组子条目为对象的去重
function unique_better(arr, newitem) {
  var ret = [];
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    if (typeof(arr[i]) == 'object') {
      var item = arr[i][newitem];
    } else {
      var item = arr[i];
    }
    var item1 = arr[i]
    var key = typeof(item) + item;
    if (hash[key] !== 1) {
      ret.push(item1);
      hash[key] = 1;
    }
  }
  return ret;
};

// //@4: 更高级和复杂的去重法
// Array.prototype.arrUniq = function () {
//   var temp, arrVal,
//     array = this,
//     arrClone = array.concat(),//克隆数组
//     typeArr = {//数组原型
//       'obj': '[object Object]',
//       'fun': '[object Function]',
//       'arr': '[object Array]',
//       'num': '[object Number]'
//     },
//     ent = /(\u3000|\s|\t)*(\n)+(\u3000|\s|\t)*/gi;//空白字符正则
//
//   //把数组中的object和function转换为字符串形式
//   for (var i = arrClone.length; i--;) {
//     arrVal = arrClone[i];
//     temp = Object.prototype.toString.call(arrVal);
//
//     if (temp == typeArr['num'] && arrVal.toString() == 'NaN') {
//       arrClone[i] = arrVal.toString();
//     }
//
//     if (temp == typeArr['obj']) {
//       arrClone[i] = JSON.stringify(arrVal);
//     }
//
//     if (temp == typeArr['fun']) {
//       arrClone[i] = arrVal.toString().replace(ent, '');
//     }
//   }
//
//   //去重关键步骤
//   for (var i = arrClone.length; i--;) {
//     arrVal = arrClone[i];
//     temp = Object.prototype.toString.call(arrVal);
//
//     if (temp == typeArr['arr']) arrVal.arrUniq();//如果数组中有数组，则递归
//     if (arrClone.indexOf(arrVal) != arrClone.lastIndexOf(arrVal)) {//如果有重复的，则去重
//       array.splice(i, 1);
//       arrClone.splice(i, 1);
//     }
//     else {
//       if (Object.prototype.toString.call(array[i]) != temp) {
//         //检查现在数组和原始数组的值类型是否相同，如果不同则用原数组中的替换，原因是原数组经过了字符串变换
//         arrClone[i] = array[i];
//       }
//     }
//   }
//   return arrClone;
// };

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
var getFormatTime = function (date) {
  var dateTemp, minutes, hour, time, seconds;
  dateTemp = date.format("yyyy-MM-dd");
  //秒
  if (date.getSeconds().toString().length < 2) {
    seconds = "0" + date.getSeconds();
  } else {
    seconds = date.getSeconds();
  }
  ;
  //分钟
  if (date.getMinutes().toString().length < 2) {
    minutes = "0" + date.getMinutes();
  } else {
    minutes = date.getMinutes();
  }
  ;
  //小时
  if (date.getHours().toString().length < 2) {
    hour = "0" + date.getHours();
    time = hour + ":" + minutes + ":" + seconds;
  } else {
    hour = date.getHours();
    time = hour + ":" + minutes + ":" + seconds;
  }

  return dateTemp + " " + time;
};

/**
 * base64编码
 * @param {Object} str
 */
var base64encode = function (str) {
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};

/**
 * AES加密
 */
var Encrypt = function (word) {
  var key = CryptoJS.enc.Utf8.parse("ucarincadmin2016");

  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
};

/**
 * AES解密
 */
var Decrypt = function (word) {
  var key = CryptoJS.enc.Utf8.parse("ucarincadmin2016");
  var str = word.replace(/[\n]/g, "");

  var decrypt = CryptoJS.AES.decrypt(str, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();

};

/**
 * 拼接日期
 * @param date
 * @returns {string}
 */
var makeupDate = function (date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
};

//日期比较
var CompareDate = function (d1, d2) {
  //将所有的短横线替换为斜杠
  return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
};

function getLastMonthFirstDate() {//获取当前日期上个月的第一天
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  if(month==0)
  {
    month=12;
    year=year-1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
  return firstDay;
}
function getPhoneType(){
//正则,忽略大小写
  var pattern_phone = new RegExp("iphone","i");
  var pattern_android = new RegExp("Android","i");
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroid = pattern_android.test(userAgent);
  var isIphone = pattern_phone.test(userAgent);
  var phoneType="phoneType";
  if(isAndroid){
    var zh_cnIndex = userAgent.indexOf("-");
    var spaceIndex = userAgent.indexOf("build",zh_cnIndex+4);
    var fullResult = userAgent.substring(zh_cnIndex,spaceIndex);
    phoneType=fullResult.split(";")[1];
  }else if(isIphone){
//6   w=375    6plus w=414   5s w=320     5 w=320
    var wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(wigth>400){
      phoneType = "iphone6p or iphone6sp";
    }else if(wigth>370){
      phoneType = "iphone6 or iphone6s";
    }else if(wigth>315){
      phoneType = "iphone5 or iphone5s";
    }else{
      phoneType = "iphone 4s";
    }

  }else{
    phoneType = "您的设备太先进了";
  }

  return phoneType;
}
