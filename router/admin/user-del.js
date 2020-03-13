const {User} = require('../../model/user');
//管理页面用户列表
module.exports = async(req, res) => {
    let { id,page } = req.body;
    console.log(req.body)
    await User.findOneAndDelete({_id: id});
    res.redirect(`/admin/user?page=${page}`);
}