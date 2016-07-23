#!/usr/bin/python

import urllib2
import cookielib
import imaplib
import datetime

msg = raw_input();
username = '9888552871'
passwd = '9888552871'
number = '9569252871'
message = msg

#logging into the sms site
url ='http://site24.way2sms.com/Login1.action?'
data = 'username='+username+'&password='+passwd+'&Submit=Sign+in'

#Remember, Cookies are to be handled
cj= cookielib.CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

opener.addheaders=[('User-Agent','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120')]

usock =opener.open(url, data)

jession_id =str(cj).split('~')[1].split(' ')[0]
send_sms_url = 'http://site24.way2sms.com/smstoss.action?'
send_sms_data = 'ssaction=ss&Token='+jession_id+'&mobile='+number+'&message='+message+'&msgLen=136'
opener.addheaders=[('Referer', 'http://site25.way2sms.com/sendSMS?Token='+jession_id)]
sms_sent_page = opener.open(send_sms_url,send_sms_data)

print("success") 

