from flask import Flask, request
import json
from flask_cors import CORS
import pymongo
import pandas as pd

import sing

app = Flask(__name__)
CORS(app)


@app.route('/sing/register',methods = ['POST', 'GET'])
def singRegister():
    data = request.get_json()
    return sing.SingRegister(data['fullname'], data['email'], data['password'])

@app.route('/sing/verificationcode',methods = ['POST', 'GET'])
def singVerificationCode():
    data = request.get_json()
    return sing.singVerificationCode(data['code'])

@app.route('/sing/loing',methods = ['POST', 'GET'])
def singLogin():
    data = request.get_json()
    return sing.singLogin(data['email'],data['pass'])

@app.route('/sing/forget',methods = ['POST', 'GET'])
def singForget():
    data = request.get_json()
    return sing.singForget(data['email'])


@app.route('/sing/changepassword',methods = ['POST', 'GET'])
def changepassword():
    data = request.get_json()
    return sing.changepassword(data['code'])

@app.route('/sing/applychangepassword',methods = ['POST', 'GET'])
def apllychangepassword():
    data = request.get_json()
    return sing.apllychangepassword(data['code'],data['password'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)