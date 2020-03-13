const mongoose = require('mongoose');
// 2.创建评论集合规则
const commonSchema = new mongoose.Schema({
    // 文章id    
    aid: {    
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'Article'        
    },    
    // 评论人用户id    
    uid: {    
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'User'        
    },    
    // 评论时间    
    time: {    
        type: Date        
    },    
    // 评论内容    
    content: {    
        type: String        
    } 
});
//创建评论集合
const Common = mongoose.model('Common', commonSchema);

module.exports = {
    Common
}