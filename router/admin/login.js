//引入加密模块
const bcrypt = require('bcryptjs');
const {User} = require('../../model/user');
module.exports = async (req, res) => {
    //获取表单提交过来的数据 对象解构
    const {email, password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0) {
        res.render('admin/error.art',{msg:'邮箱或密码错误！'})
        return
    }
    let user = await User.findOne({email})
    if(user) {
        //对用户提交的密码跟加密的密码进行比对
        const isTrue = bcrypt.compareSync(password, user.password);
        if(isTrue) {
            //将用户id储存在session里面
            req.session.userId = user._id;
            //将用户角色储存在session里面
            req.session.role = user.role;
            //将user对象传递给全局，让每个页面都能取到
            req.app.locals.userDtail = user;
            //对用户角色进行判断
            if(user.role === 'admin'){
                res.redirect('/admin/user')
            } else {
                res.redirect('/home/')
            }
        } else {
            res.status(400).render('admin/error.art',{msg:'邮箱或密码错误！'})
        }   
    } else {
        res.status(400).render('admin/error.art',{msg:'邮箱或密码错误！'})
    }  
}
