const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    const { id,page } = req.query;
    //如果传递了id
    if(id){
        let data = await Article.findOne({_id:id});
        res.render('admin/article-edit',{
            data,
            link:`/admin/article-modify?id=${id}&page=${page}`
        });
    } else {
        res.render('admin/article-edit',{
            link:`/admin/article-add`
        });
    }
}