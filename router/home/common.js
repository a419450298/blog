const { Common } = require('../../model/common');
module.exports = async(req,res)=>{
    const { content, uid, aid } = req.body;
    let data = await Common.create({
        content,
        uid,
        aid,
        time: new Date()
    });
    if(data){
        res.redirect(`/home/article?id=${aid}`);
    }
}