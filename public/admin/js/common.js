function getFormData(form){
    //获取表单中用户输入的内容
    var f = form.serializeArray();
    var result = {};
    f.forEach(function(item,index){
        result[item.name] = item.value
    })
    return result
}