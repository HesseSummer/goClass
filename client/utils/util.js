const http = (url, callBack, method = 'GET', data = '') => {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      "content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/*const formatTime2=date=>{
 const hour=date.getHours()
 const minute=date.getMinutes()
 return [hour,minute].map(formatNumber).join(':')
}*/

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  http: http,
  json2Form: json2Form,
  formatTime: formatTime,
  formatDate: formatDate

}
