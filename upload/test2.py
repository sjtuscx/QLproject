import flask, json,requests

# post入参访问方式二：from-data（k-v）格式参数

def upload(path):
    headers = {
    'Authorization': 'axX1gn5uz1CYK4tSZXRuP64o1jtmcm2q'}
    files = {
    'smfile': open(path, 'rb')}
    url = 'https://sm.ms/api/v2/upload'
    res = requests.post(url, files=files, headers=headers).json()
    print(json.dumps(res, indent=4))

if __name__ == '__main__':
    upload('C:/Users/49524/Desktop/test.jpg')
    # debug=True,改了代码后，不用重启，它会自动重启
    # 'host='127.0.0.1'别IP访问地址