const userModel = require('../models/user')
// 引入jwt token工具
const JwtUtil = require('../untils/jwt');
//const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    let datas = req.body;
    let userName = datas.username;
    let passWord = datas.password;
    console.log(datas);
    let userInfo = await userModel.findOne({ 'username': userName });
    if (userInfo) {
        console.log(userInfo);
        if (userInfo.password == passWord) {
            // 登陆成功，添加token验证
            let _id = userInfo._id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(_id);
            let token = jwt.generateToken();
            // 将 token 返回给客户端
            res.send({
                msg: '登录成功',
                code: 200,
                data: {
                    userInfo,
                    token
                }
            })
        } else {
            res.send({
                msg: '账号密码错误',
                code: 500
            })
        }
    } else {
        res.send({
            msg: '账号不存在',
            code: 500
        })
    }
}

const info = async (req, res, next) => {
    let datas = req.body;
    console.log(datas);

    res.send({
        msg: '获取栏目成功',
        code: 200,
        data: {
            test: '1321323121'
        }
    })
}

module.exports = {
    login,
    info
}