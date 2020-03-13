//引入加密模块
const bcrypt = require('bcryptjs');
const {User} = require('../../model/user');
module.exports = async(req,res,next)=>{
    // 接受客户端传递过来的数据
    const { username, email, role, state } = req.body;
    //即将要修改的用户id
    const {id,page} = req.query;
    //通过id查找要修改的用户
    let user = await User.findOne({_id: id});
    console.log(user)
    //密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(isValid){
        //将用户信息更新到数据库中
        let obg = {
            username,
            email,
            role,
            state
        }
        await User.updateOne({_id: id},obg);
        res.redirect(`/admin/user?page=${page}`);
    }else{
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败，不能进行用户信息的修改',
            id: id
        }
        next(JSON.stringify(obj));
    }
}