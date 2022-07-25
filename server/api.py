
import json
from requests import request
import pandas as  pd
import requests
token = '6e437430f8f55f9ba41f7a2cfea64d90'

def bfindex():
    dic = {}
    urlB = f'https://sourcearena.ir/api/?token={token}&market=market_bourse'
    bourse_index = requests.get(url=urlB).json()
    dic['indexBourse'] = float(bourse_index['bourse']['index'].replace(',',''))
    dic['indexBoursePrc'] = float(bourse_index['bourse']['index_change_percent'])
    dic['indexBourseHam'] = float(bourse_index['bourse']['index_h'].replace(',',''))
    dic['indexBourseHamPrc'] = float(bourse_index['bourse']['index_h_change_percent'])
    urlD = f'https://sourcearena.ir/api/?token={token}&currency'
    bourse_index = requests.get(url=urlD).json()['data']
    seke = [x for x in bourse_index if x['slug']=='SEKE_EMAMI'][0]
    dic['seke'] = float(seke['price'])
    dic['sekePrc'] = float(seke['change_percent'])
    print(dic)
    return json.dumps(dic)

