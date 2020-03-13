const mongoose = require('mongoose');
//引入表单验证模块
const Joi = require('joi');
//引入加密模块
// const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },
    //0 启用状态
    //1 停用状态
    state: {
        type: Number,
        default: 1
    }
})

//创建集合
const User = mongoose.model('User', userSchema);
//对明文密码进行加密
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("123456", salt);
//创建初始化用户
// User.create({
//     username: '李连杰',
//     password: hash,
//     email: 'llj@qq.com',
//     role: 'admin',
//     state: 0
// })
// .then(()=>{
//     console.log('用户创建成功')
// })
// .catch(()=>{
//     console.log('用户创建失败')
// });

//表单验证公用方法
let validataUser = user=>{
    //定义对象的验证规则
    const schema = {
        username: Joi.string().required().min(2).max(5).error(new Error('用户名没有通过验证')),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码没有通过验证')),
        email: Joi.string().required().email().error(new Error('邮箱没有通过验证')),
        role: Joi.string().required().valid('normal','admin').error(new Error('角色值不合法')),
        state: Joi.number().required().valid(0,1).error(new Error('状体值不合法'))
    };
    //实施验证
    return Joi.validate(user, schema);
}

//将用户集合作为模块成员导出
module.exports = {
    User,
    validataUser
}