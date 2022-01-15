var fileHost = "https://xiaokai271828.oss-cn-shanghai.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
var config = {
   //aliyun OSS config
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'LTAI4GF5kZxp4iY1mrkQ9hpP',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'z3ctD60txRUj9da9mvtLgFDY8Pcaks',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config