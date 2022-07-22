import requests
from datetime import datetime
import time
import pymongo
import timeir
client = pymongo.MongoClient()
roundbourse_db = client['roundbourse']

authentication_cl = roundbourse_db['authentication']

tokenApi = '6e437430f8f55f9ba41f7a2cfea64d90'
url = 'https://sourcearena.ir/api/'

def getAllSymboll():
    data = requests.get(url=url+f'?token={tokenApi}&all&type=2').json()
    now = datetime.now()
    timestump = int(time.time())
    for i in data:
        i['time'] = now.strftime('%H:%M:%S')
        i['timestump'] = timestump
        roundbourse_db['allDataLive'].insert_one(i)
        


while True:
    if timeir.ShowTodayFull():
        h = time.localtime().tm_hour()
        m = time.localtime().tm_min()
        if h=
    

    else:
        time.sleep(60*60)