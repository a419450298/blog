const {Article} = require('../../model/article');
//管理页面用户列表
module.exports = async(req, res) => {
    let { id,page } = req.body;
    await Article.findOneAndDelete({_id: id});
    res.redirect(`/admin/article?page=${page}`);
}