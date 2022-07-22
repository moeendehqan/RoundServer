import json
import authentication
import requests




def topVolume(token):
    if authentication.badToken(token):
        return json.dumps({'replay':False, 'msg':'درخواست نامعتبر'})
    
    return json.dumps({'replay':False, 'msg':'درخواست نامعتبر'})