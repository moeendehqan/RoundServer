import json
from turtle import pen
from pymongo import MongoClient
import pandas as pd
import random
import string
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

client = MongoClient()
base_db = client['RB_base']
users_cl = base_db['users']
password_app ='gmgryctlpbpnyjnr'

def Send_Email(mail_content, Subject, receiver_address):
    sender_address = 'moeen.dehqan@gmail.com'
    sender_pass = password_app
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = 'moeen.kingo@gmail.com'
    message['Subject'] = Subject
    message.attach(MIMEText(mail_content, 'plain'))
    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls() #enable security
    session.login(sender_address, sender_pass)
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()

def SingRegister(fullname, email, password):
    lastRegister = users_cl.find_one({'email':email})
    if lastRegister!=None:
        if lastRegister['confirmed'] == True:
            return json.dumps({'replay':False, 'msg':'با این ایمیل قبلا ثبت نام شده است'})
        else:
            users_cl.delete_one({'email':email})
    VerificationCode = ''.join(random.choices(string.ascii_letters + string.digits, k=30))
    user = {'fullname':fullname, 'email':email, 'password':password, 'confirmed':False, 'VerificationCode':VerificationCode}
    users_cl.insert_one(user)
    mail_content = f'{fullname} عزیز \n از ثبت نام شما متشکریم کد زیر جهت تایید ایمیل شما میباشد میتوانید آن را در قسمت تایید ایمیل وارده نموده یا از طریق لینک زیر بصورت خودکار این کار را انجام دهید '
    mail_content = mail_content+'\n'+f'{VerificationCode} کدتایید' + '\n' + f'http://localhost:3000/confirmed?verificationcode={VerificationCode}'
    Send_Email(mail_content, 'رند بورس - تایید ایمیل', email)
    return json.dumps({'replay':True})



def singVerificationCode(VerificationCode):
    user = users_cl.find_one({'VerificationCode':VerificationCode},{'_id':0})
    if user !=None and user['confirmed']==False:
        users_cl.update_one({'VerificationCode':VerificationCode}, {"$set" :{'confirmed':True}})
        name = user['fullname']
        return json.dumps({'replay':True, 'data':user})
    elif user !=None and user['confirmed']==True:
        name = user['fullname']
        return json.dumps({'replay':True, 'data':user})
    else:
        return json.dumps({'replay':False, 'msg':'کد وارد شده صحیح نیست'})

def singLogin(email, password):
    user = users_cl.find_one({'email':email, 'password':password},{'_id':0})
    if user!=None:
        return json.dumps({'replay':True, 'data':user})
    else:
        return json.dumps({'replay':False})

def singForget(email):
    user = users_cl.find_one({'email':email},{'_id':0})
    print(0)
    if user == None:
        return json.dumps({'replay':False})
    VerificationCode = ''.join(random.choices(string.ascii_letters + string.digits, k=30))
    users_cl.update_one({'email':email}, {"$set" :{'VerificationCode':VerificationCode}})
    name = user['fullname']
    mail_content = f'{name} عزیز \n لینک باز یابی رمزعبور \n'
    mail_content = mail_content + f'http://localhost:3000/changepassword?verificationcode={VerificationCode}'
    Send_Email(mail_content, 'رند بورس - بازیابی رمزعبور', email)
    return json.dumps({'replay':True})

def changepassword(code):
    user = users_cl.find_one({'VerificationCode':code},{'_id':0})
    if user == None:
        return json.dumps({'replay':False})
    return json.dumps({'replay':True, 'data':user})

def apllychangepassword(code,password):
    user = users_cl.find_one({'VerificationCode':code},{'_id':0})
    if user == None:
        return json.dumps({'replay':False})
    users_cl.update_one({'VerificationCode':code}, {"$set" :{'password':password}})
    return json.dumps({'replay':True, 'data':user})