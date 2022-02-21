const multer = require("@koa/multer");

let imgName;
//文件保存设置
const storage = multer.diskStorage({
  // 文件保存路径, 这里需要自己手动到public下面新建upload文件夹。
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  //文件名字设置
  filename(req, file, cb) {
    let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
    //文件名字，时间+原文件名字，防止文件名字重复
    let fileNowName =
      Date.now() + fileFormat[0] + "." + fileFormat[fileFormat.length - 1];
    imgName = fileNowName; //记录改变后的文件名字

    cb(null, fileNowName);
  },
});
//文件上传限制
const limits = {
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4, // 限制4m
    },
};
function getImgName(){
    return imgName;
}
const upload = multer({ storage, limits });

module.exports = {
    upload,
    getImgName
};