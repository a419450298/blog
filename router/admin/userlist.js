const {User} = require('../../model/user');
//管理页面用户列表
module.exports = async(req, res) => {
    req.app.locals.currentLink = 'user';
    //当前页当前页码
    let currentPage = req.query.page || 1;
    //每一页显示条数
    let pageSize = 4;
    //skip的值(从哪一条数据开始显示)
    //start = (当前页码 -1) * 每一页显示条数
    let start = (currentPage - 1) * pageSize;

    //查询用户数据总数
    let count = await User.countDocuments();
    //总页数
    let total = Math.ceil(count / pageSize);    

    //读取用户
    let userlist = await User.find().skip(start).limit(pageSize);    
    res.render('admin/user',{userlist,total,currentPage})
}