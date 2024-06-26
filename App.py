import datetime
from flask import Flask,render_template,request,redirect, send_from_directory,url_for,session,flash
import flask
from datetime import timedelta
#db libraries
from flask_mysqldb import MySQL
import MySQLdb.cursors
#use regex library for using it for email,password and username validations
import re
#use os libray to save images
import os
from flask import json



app=flask.Flask("app")
app.secret_key = 'my_super_secret_key'
app.permanent_session_lifetime=timedelta(minutes=10)
#dB configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'travel'

mysql = MySQL(app)
def readJson():
    with open('file.json') as json_file:
            data = json.load(json_file)
    return data        


def getCities(FavFound):
    allcities=readJson()
    CitiesData=[]
    for i in allcities['allcities']:
        for e in FavFound:
            if e== str(i['id']):
                CitiesData.append(i)       

    return   CitiesData        



class traveller():

    def __init__(self,username,paswrd):
        self.username=username
        self.paswrd=paswrd

    # def connection(self):
    
    def newTraveller(self,email,confPaswrd):
        self.email=email
        self.confPaswrd=confPaswrd
        resultMSG=""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM traveller WHERE username = % s', (self.username ,))
        alreadyFound = cursor.fetchone()
        if alreadyFound :
            resultMSG="username Already exists" 
            # print
        elif not re.match(r'[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+',self.email):
            resultMSG="Invalid Email"
        elif not re.match(r'^[a-z0-9_-]{3,15}$',self.username):
            resultMSG="choose proper username with only characters and numbers "
        elif self.paswrd != self.confPaswrd :
            resultMSG="Passwords don't match"
        elif not self.username or not self.paswrd or not self.confPaswrd or not self.email:
            resultMSG = "Please fill out the form !"
        else:
            cursor.execute('INSERT INTO `traveller`(`email`, `username`, `password`) VALUES ( % s, % s, % s) ',(self.email,self.username,self.paswrd) )
            mysql.connection.commit()
            resultMSG = 'You have successfully registered !'
        return render_template("signup.html",resultMSG=resultMSG)
    
    def checkLogIn(self):
        resultMSG=""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM traveller WHERE username = % s AND password = % s', (self.username, self.paswrd, ))
        alreadyFound = cursor.fetchone()
        if alreadyFound:
            session.permanent=True
            session["user"]=self.username
            if self.username=='admin@admin.com' and self.paswrd =='123':
                return redirect(url_for("updatecities"))
            # session['msg']="logged in successfully!"
            return redirect(url_for("tours"))
        else:
           resultMSG="incorrect Username or password"
        return render_template("login.html",resultMSG=resultMSG) 
    



@app.route("/")
def homePage():
    if "user" in session:
        user=session["user"]
        return render_template("index.html")
    else :
        return render_template("login.html")

@app.route("/login",methods=["POST","GET"])
def login():
    if request.method =="POST" and  "user" in request.form and "passwrd" in request.form:
        LoginTraveller=traveller(username=request.form["user"] ,paswrd=request.form["passwrd"])
        return LoginTraveller.checkLogIn()
    else :
        if "user" in session:
            return render_template("tours.html")
        return render_template("login.html")
                      
                           


@app.route("/signup",methods=["POST","GET"])
def signup():     
    if request.method =="POST" and "email" in request.form and "Username" in request.form and "passwrdinput" in request.form and "ConfirmPasswrd" in request.form:
        # create object from class traveller
        newtraveller=traveller(username=request.form["Username"],paswrd=request.form["passwrdinput"])
        return newtraveller.newTraveller(email=request.form["email"],confPaswrd=request.form["ConfirmPasswrd"])
        

    elif request.method =="GET":
           resultMSG="Please fill out the form !"
           return render_template("signup.html",resultMSG=resultMSG )
   
            


@app.route("/tours")
def tours():
    if "user" in session:
        user=session["user"]
        data=readJson()
        return render_template("tours.html",name=user,data=enumerate(data["allcities"]))
    else :
        return render_template("login.html")

@app.route("/showcity/<idx>")
def showcity(idx):
    if "user" in session:
        idx=int(idx)
        data=readJson()
        return  render_template("showcity.html",data=enumerate(data["allcities"]),cityidx=idx)
    return render_template("login.html")





@app.route("/addtoFav/<idx>")
def addtoFav(idx):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if "user" in session:
        user=session["user"]
        cursor.execute('SELECT `favouritecities` FROM traveller WHERE username = % s ', (user, ))
        cityArr = cursor.fetchone()
        if len(cityArr['favouritecities']) == 0:
            cityArr['favouritecities']+=idx                
        else:
            cityArr['favouritecities']+=','+idx                
        cursor.execute('UPDATE `traveller` SET `favouritecities` =  % s   WHERE `username` = % s', ( cityArr['favouritecities'],user,))
        mysql.connection.commit()
        idx=int(idx)
        #to redirect the user to the page of the city he saved
        data=readJson()
        return render_template("showcity.html",data=enumerate(data["allcities"]),cityidx=idx)
    else:
        return render_template("login.html")

        

@app.route("/destinations",methods=["GET", "POST"])
def destinations():
    if "user" in session:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            user=session["user"]
            cursor.execute('SELECT `favouritecities` FROM traveller WHERE username = % s ', (user, ))
            FavFound = cursor.fetchone()['favouritecities']#.split(",") 
            if len(FavFound) > 0:
                data= getCities(FavFound) #data is a list of dict
                return render_template("destinations.html", data=enumerate(data))
            return render_template("noFavFound.html",msg="destinations cities")
    else:
        return render_template("login.html")







@app.route("/visited")
def visited():
    if "user" in session:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            user=session["user"]
            cursor.execute('SELECT `visitedCities` FROM traveller WHERE username = % s ', (user, ))
            visitedFound = cursor.fetchone()['visitedCities']#.split(",") 
            if len(visitedFound) > 0:
                data= getCities(visitedFound) #data is a list of dict
                return render_template("destinations.html", data=enumerate(data))
            return render_template("noFavFound.html",msg="visited cities")
    else:
        return render_template("login.html")
  


@app.route("/addtovisited/<idx>")
def addtovisited(idx):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if "user" in session:
        user=session["user"]
        cursor.execute('SELECT `visitedCities` FROM traveller WHERE username = % s ', (user, ))
        cityArr = cursor.fetchone()
        if len(cityArr['visitedCities']) == 0:
            cityArr['visitedCities']+=idx                
        else:
            cityArr['visitedCities']+=','+idx                
        cursor.execute('UPDATE `traveller` SET `visitedCities` =  % s   WHERE `username` = % s', ( cityArr['visitedCities'],user,))
        mysql.connection.commit()
        idx=int(idx)
        #to redirect the user to the page of the city he saved
        data=readJson()
        return render_template("showcity.html",data=enumerate(data["allcities"]),cityidx=idx)
    else:
        return render_template("login.html")



@app.route("/updatecities",methods=["POST","GET"])
def updatecities():
    if request.method=="POST":
        #####get inputs from admin page
        data=readJson()
        newId=len(data["allcities"])+1
        uploaded_files = request.files.getlist("imgs[]")
        cityname=request.form.get("name")
        country=request.form.get("country")
        attractions=request.form.get("attractions")
        arrofimgs=[]
        newcity={"id":newId,"name":cityname,"country":country,"attractions":[attractions],"images": []}
        for file in uploaded_files:
              imgDir = "static/images/"+file.filename
              file.save(imgDir)
              arrofimgs.append("/"+imgDir)
        newcity["images"]=arrofimgs
        data["allcities"].append(newcity)
        with open('file.json', 'w', encoding='utf-8') as file:
            json.dump(data,file, indent=4)
        return render_template("updatecities.html",msg="Files uploaded successfully")

    else:
        return render_template("updatecities.html")
        

    

@app.route("/logout")
def logout():
    session.pop("user",None)
    return render_template("login.html")
