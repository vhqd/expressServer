const testModel = require('../models/test')
// 引入jwt token工具
const JwtUtil = require('../untils/jwt');
//const jwt = require('jsonwebtoken');

const getTest = async (req, res, next) => {
    let datas = req.body;
    console.log(datas);
    let back = await testModel.find();
    if (back) {
        console.log(back);
        // 登陆成功，添加token验证
        //let _id = result._id.toString();
        let _id = '123321';
        // 将用户id传入并生成token
        let jwt = new JwtUtil(_id);
        let token = jwt.generateToken();

        /* // 登陆成功，添加token验证
        let content = { username: '12321' }; // 要生成token的主题信息
        let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
        let token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60 * 60 * 1  // 1小时过期
        }); */
        // 将 token 返回给客户端
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                test: back,
                token: token
            }
        })
    } else {
        res.send({
            msg: '添加文章失败',
            code: -1
        })
    }
}

const getTest1 = async (req, res, next) => {
    res.send({
        msg: '获取栏目成功',
        code: 200,
        data: {
            test: '132132312000000000000001'
        }
    })
}

module.exports = {
    getTest,
    getTest1
}