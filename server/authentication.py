import pymongo

client = pymongo.MongoClient()

roundbourse_db = client['roundbourse']
authentication_cl = roundbourse_db['authentication']


def badToken(token):
    return authentication_cl.find_one({'token':token})==None


