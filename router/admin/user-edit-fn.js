//引入表单验证模块
const Joi = require('joi');
//引入加密模块
const bcrypt = require('bcryptjs');
const {User,validataUser} = require('../../model/user');
module.exports = async(req, res, next) => {
    try {
        //实施验证
        await validataUser(req.body);
    } catch(err) {
        //如果验证不成功，返回错误信息到get请求的url中
        return next(JSON.stringify({path: '/admin/user-edit',message:err.message}))
    }   
    
    let emailData = await User.findOne({email:req.body.email})
    if(emailData) { 
        return next(JSON.stringify({path: '/admin/user-edit',message:'邮箱已被占用'}))
    } else {
        console.log('验证通过');
        //对明文密码进行加密
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        let data = await User.create(req.body);
        if(data){
            res.redirect('/admin/user');
        }
    }
    
}