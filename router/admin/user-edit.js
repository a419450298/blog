const {User} = require('../../model/user');
module.exports = async(req, res) => {
    //通过req.query接收传来的错误信息，传递到模板中
    const { message,id,page } = req.query;
    //如果传递了id
    if(id){
        let data = await User.findOne({_id:id});
        res.render('admin/user-edit',{
            message,
            data,
            link:`/admin/user-modify?id=${id}&page=${page}`
        });
    } else {
        res.render('admin/user-edit',{
            message,
            link:`/admin/user-edit`
        });
    }
}