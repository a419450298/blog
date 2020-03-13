const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req,res)=>{
    const page = req.query.page;
    const result = await pagination(Article).find().page(page).size(2).display().populate('author').exec();
    res.render('home/default',{result})
}