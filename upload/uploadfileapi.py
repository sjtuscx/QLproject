import flask, json,requests

# 实例化api，把当前这个python文件当作一个服务，__name__代表当前这个python文件
api = flask.Flask(__name__)

# post入参访问方式二：from-data（k-v）格式参数

def upload(path, tokens):
    headers = {
    'Authorization': 'tdur6d467df76rftyfvuyfu'}
    files = {
    'smfile': open(path, 'rb')}
    url = 'https://sm.ms/api/v2/upload'
    res = requests.post(url, files=files, headers=headers).json()
    print(json.dumps(res, indent=4))

# 'get_api'是接口路径，methods不写，默认get请求
@api.route('/get_api',methods=['get'])
# get方式访问
def get_api():
  ren = {'msg':'小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，'
               '同时具有出色的使用体验。对于普通用户，小程序实现了应用的触手可及，只需要通过扫描二维码、搜索或者是朋友的分享就可以直接打开，加上优秀的体验，'
               '小程序极大程度增强了服务提供者的触达能力。对于开发者而言，小程序框架本身所具有的快速加载和快速渲染能力，加之配套的云能力、运维能力和数据汇总能力，'
               '使得开发者不需要去处理琐碎的工作，可以把精力放置在具体的业务逻辑的开发上。小程序的模式使得微信可以开放更多的数据，开发者可以获取到用户的一些基本信息，'
               '甚至能够获取微信群的一些信息，使得小程序的开放能力变得更加强大。','msg_code':200}
  #json.dumps 序列化时对中文默认使用的ascii编码.想输出中文需要指定ensure_ascii=False
  return json.dumps(ren,ensure_ascii=False)


@api.route('/upload', methods=['post'])
def upload():
    # from-data格式参数
    filepath = flask.request.values.get('filepath')
    token = flask.request.values.get('token')
    print(filepath)
    print(token)
    # headers = {
    # 'Authorization': token}
    # files = {
    # 'smfile': open(filepath, 'rb')}
    # url = 'https://sm.ms/api/v2/upload'
    # res = requests.post(url, files=files, headers=headers).json()
    upload('uploadimag.png', token)
    # print(json.dumps(res, indent=4))


    ren = {'msg': 'files are uploaded successfully', 'msg_code': 200}
    return json.dumps(ren, ensure_ascii=True)


if __name__ == '__main__':
    api.run(port=8808, debug=True, host='127.0.0.1')  # 启动服务
    # debug=True,改了代码后，不用重启，它会自动重启
    # 'host='127.0.0.1'别IP访问地址