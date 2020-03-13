const { Article } = require('../../model/article');
const { Common } = require('../../model/common');
module.exports = async(req,res)=>{
    const articledit = await Article.findOne({_id:req.query.id}).populate('author');
    const commons = await Common.find({aid:req.query.id}).populate('uid');
    res.render('home/article',{articledit,commons})
}