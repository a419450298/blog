const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    const page = req.query.page;
    req.app.locals.currentLink = 'article';
    // page 指定当前页    
    // suze 指定每页显示的数据条数    
    // display 指定客户端要显示的页码数量    
    // exec 向数据库中发送查询请求 
    const articleList = await pagination(Article).find().page(page).size(2).display().populate('author').exec();
    res.render('admin/article',{
        articleList
    });
}