const md5 = require('md5')
const userModel = require('../libs/mysql')

exports.login = async (ctx, next) => {
    console.log(ctx.request.fields)
    let {username, password} = ctx.request.fields;

    let data = await userModel.findUserData(username);
    console.log(data)
    // console.log(md5('111'))
    ctx.body = {
        'status': 0,
        'message': '成功',
        'data': {}
    }


}