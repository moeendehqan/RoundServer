from bs4 import BeautifulSoup
import requests
import pymongo
client = pymongo.MongoClient()
roundbourse_db = client['roundbourse']


api_url = 'https://www.time.ir/'
response = requests.get(api_url)
soup = BeautifulSoup(response.content, 'html.parser')
varShowTodayFull = soup.find(id='ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate00cphTop_3734_lblShamsiNumeral').text

varShowTodayFull = varShowTodayFull.replace('۰','0').replace('۱','1').replace('۲','2').replace('۳','3').replace('۴','4').replace('۵','5').replace('۶','6').replace('۸','8').replace('۹','9')


def ShowTodayFull():
    return roundbourse_db['holiday'].find_one({'date':varShowTodayFull})['holiday']==0
