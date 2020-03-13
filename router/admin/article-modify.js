const { Article } = require('../../model/article');
const path = require('path');
// 引入formidable第三方模块
const formidable = require('formidable');
module.exports = async(req, res) => {
    const { page,id } = req.query;
    // console.log(req.query)
    // console.log(req.body)
    // return
    // 1.创建表单解析对象    
    const form = new formidable.IncomingForm();    
    // 2.配置上传文件的存放位置    
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');   
    // 3.保留上传文件的后缀    
    form.keepExtensions = true;    
    // 4.解析表单    
    form.parse(req, async (err, fields, files) => {    
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null        
        // 2.fields 对象类型 保存普通表单数据        
        // 3.files 对象类型 保存了和上传文件相关的数据        
        // res.send(files.cover.path.split('public')[1])   
        Article.updateOne({_id: id},{
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        .then(()=>{
            console.log('文章修改成功')
            res.redirect(`/admin/article?page=${page}`);
        })
        .catch((i)=>{
            console.log(i)
        });
        // await Article.updateOne({_id: id},obj)
        // res.redirect(`/admin/article?page=${page}`);
    })   
}