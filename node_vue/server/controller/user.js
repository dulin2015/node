const md5 = require('md5')
const userModel = require('../libs/mysql')
const fs = require('fs')
const send = require('koa-send')

/**
 * 登录
 */
exports.login = async(ctx, next) => {
  let {username, password} = ctx.request.fields;

  try {
    let data = await userModel.findUserData(username);

    if (data.length == 0) {
      ctx.body = {
        'status': 1,
        'message': '用户不存在',
        'data': {}
      }
    } else {
      console.log(md5(data[0].password))
      if (md5(data[0].password) !== password) {
        ctx.body = {
          'status': 1,
          'message': '密码不正确',
          'data': {}
        }
      } else {
        ctx.body = {
          'status': 0,
          'message': '登录成功',
          'data': {}
        }
      }
    }

  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 下载
 */
exports.download = async(ctx, next) => {
  try {
    ctx.set('content-type', 'text/json; charset=utf-8');
    const path = 'upload/a.txt';
    ctx.attachment(path);
    ctx.body = await send(ctx, path);
  } catch (error) {
    throw new Error(error);
  }

}