// 服务器域名
const baseUrl = 'http://127.0.0.1:3003/';
// 登录接口
const loginUrl = baseUrl + 'api/book/getBooks';
// 获取邀约信息接口
const getInvUrl = baseUrl + 'api/invitations/list';


module.exports = {
  loginUrl: loginUrl,
  getInvUrl: getInvUrl
};