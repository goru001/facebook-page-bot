# facebook-page-bot

####Introduction

This repository will help you set-up your own Facebook-page-Bot, which you can use to receive all the messages that are sent to
your Facebook-Page, via sms, for free! This is super-useful for those who don't like wasting time on facebook, but want to get
all the messages sent to them.  

####Requirements

######1. You'll need to deploy this project on a server, that supports Node.js and Python2.7 . If you have some server space 

(like on AWS), then you may skip this step, otherwise, 

              SignUp for an account on www.modulus.io . Get your LOGIN and PASSWORD. 
              
  if you don't get any error, then congratulations, we've set up server space for our project.
  

######2. Way2SMS account(www.way2sms.com)


######3. Getting the Environment Ready:

(a). Install npm
              
              $ sudo apt-get install npm 

(b). Install node
            
              $ npm install node
              
(c). Installing Dependencies
              
              $ npm install body-parser
              $ npm install body-parser
              $ npm install request 
              $ npm install python-shell
              
(d). Keeping it clean

              $ mkdir facebook-page-bot && cd facebook-page-bot
              $ npm install -g modulus

####QuickStart


######1. Clone the repository

              $ git clone https://github.com/goru001/facebook-page-bot.git
              

######2. Your Configuration

(a). Fill out the information,after runnning:
  
              $ python start.py
              
You will be asked about ::
     

Way2SMSLogin -----> WAY2SMS-LOGIN 
     
              Way2SMSLogin ----->  9569252871
              

Way2SMSPassword -----> WAY2SMS-PASSWORD

              Way2SMSPassword -----> goru
              

PhoneNumber ------> number-on-which-you-want-to-receive-messages

              PhoneNumber -----> 9569252871
              



(b). Login to modulus and deploy:

              $ modulus --login
              $ modulus deploy
              

(c). You can see the error logs by:

              $ modulus logs
              
              
Good Luck!

###Bugs

Feel free to fork and push if you see any bugs in the scripts, or send me a mail about the bug,! :)
