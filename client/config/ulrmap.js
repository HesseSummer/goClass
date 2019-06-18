/*登录*/
const loginUrl = 'http://www.triple2.xyz:8081/login/wxlogin'

/*查空教室*/
const freeUrl = 'http://www.triple2.xyz:8081/schedule/floortoday'

/*约自习*/
//查
const invSearchUrl = 'http://www.triple2.xyz:8081/invitation/searchall'
const invAllUrl = 'http://www.triple2.xyz:8081/invitation/searchall'
const usrAllUrl = 'http://www.triple2.xyz:8081/invitation/userinvitation'// 用户自己的
//删、改、增
const DInvUrl = 'http://www.triple2.xyz:8081/invitation/delete'
const EInvUrl = 'http://www.triple2.xyz:8081/invitation/updata'
const SendInvUrl = 'http://www.triple2.xyz:8081/invitation/setinvitation'

/*蹭课*/
const cnameSearchUrl = 'http://www.triple2.xyz:8081/schedule/cname'
const majorSearchUrl = 'http://www.triple2.xyz:8081/schedule/major'
const tSearchUrl = 'http://www.triple2.xyz:8081/schedule/teacher'

module.exports = {
  loginUrl,
  freeUrl,
  invSearchUrl,
  invAllUrl,
  usrAllUrl,
  DInvUrl,
  EInvUrl,
  SendInvUrl,
  cnameSearchUrl,
  majorSearchUrl,
  tSearchUrl
}