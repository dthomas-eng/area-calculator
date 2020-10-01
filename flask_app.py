from flask import Flask
from flask import request
import json
from multiprocessing import cpu_count

app = Flask(__name__)

@app.route("/")
def index():
    return "Index!"

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/members")
def members():
    return "Members!"

@app.route("/members/<string:name>/")
def getMember(name):
    return name

@app.route("/add/<int:num1>/<int:num2>")
def add(num1,num2):
    sum = num1 + num2
    return str(sum)

@app.route("/data")
def data():
    return "This is the Data"



@app.route("/getIP", methods=['GET', 'POST'])
def getIP():

    creditLimit = 10

    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    print('Session started at: ', ip)

    import MySQLdb

    db = MySQLdb.connect(host="visualcalcs.mysql.pythonanywhere-services.com",  # your host
                         user="visualcalcs",       # username
                         passwd="as98safh98faea89",     # password
                         db="visualcalcs$SessionTracking")   # name of the database

    # Create a Cursor object to execute queries.
    cur = db.cursor()

    #First, we see if the ip address has accessed the tool before.
    SQLstring = "SELECT EXISTS(SELECT * FROM ipvisits WHERE ip_address=\'"+ip+"\');"

    cur.execute(SQLstring)

    #Print the first and second columns
    for row in cur.fetchall() :
        ipNotNew = row[0]

    #If it is a new IP, enter it in the table.
    if ipNotNew == 0:
        SQLstring = "INSERT INTO ipvisits VALUES(\'"+ip+"\'," + str(creditLimit) + ", NULL, 0);"
        cur.execute(SQLstring)
        db.commit()
        print('New IP - Adding to Table')
        return str(creditLimit)

    elif ipNotNew == 1:
        SQLstring = "SELECT * FROM ipvisits WHERE ip_address=\'"+ip+"\';"
        cur.execute(SQLstring)

        for row in cur.fetchall() :
            remainingCredits = row[1]

        print('Old IP, getting used credits.')

        print('Remaining Credits: ', remainingCredits)

        return str(remainingCredits)

@app.route("/UseCredit", methods=['GET', 'POST'])
def UseCredit():

#This function is called whenever the used analysis credits value needs to be incremented for an IP.
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    print('Analysis performed at IP: ', ip)

    import MySQLdb

    db = MySQLdb.connect(host="visualcalcs.mysql.pythonanywhere-services.com",  # your host
                         user="visualcalcs",       # username
                         passwd="as98safh98faea89",     # password
                         db="visualcalcs$SessionTracking")   # name of the database

    # Create a Cursor object to execute queries.
    cur = db.cursor()

    SQLstring = "SELECT * FROM ipvisits WHERE ip_address=\'"+ip+"\';"
    cur.execute(SQLstring)

    for row in cur.fetchall() :
        remainingCredits = row[1]

    #increment it!
    remainingCredits -= 1

    #update the database.
    SQLstring = "UPDATE ipvisits SET num_runs=" + str(remainingCredits) + " WHERE ip_address=\'"+ip+"\';"
    cur.execute(SQLstring)
    db.commit()

    print('Updated remaining credits: ', remainingCredits)

    return str(remainingCredits)



@app.route("/PrintToLog", methods=['GET', 'POST'])
def PrintToLog():

    #print("-----------Log Print---------------")

    if request.method == 'POST':
        data = request.data
        data = str(data)
        data = data[2:-1];

    print(data)

    return 'some return data'

@app.route("/SendShape", methods=['GET', 'POST'])
def SendShape():

    from datetime import datetime

    # datetime object containing current date and time
    now = datetime.now()

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    if request.method == 'POST':
        data = request.data
        data = str(data)
        data = data[2:-1];

    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.base import MIMEBase
    from email import encoders

    mail_content = data

    #The mail addresses and password
    sender_address = 'visualcalcstester@gmail.com'
    sender_pass = 'rzcqlxpgmftenryg'
    receiver_address = 'visualcalcstester@gmail.com'

    #Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    message['Subject'] = 'Run at ' + dt_string
    #The subject line

    #The body and the attachments for the mail
    message.attach(MIMEText(mail_content, 'plain'))
    #attach_file_name = 'Submitted Shape.json'

    #attach_file = data #open(attach_file_name, 'rb') # Open the file as binary mode
    #payload = MIMEBase('application', 'octate-stream')
    #payload.set_payload((attach_file).read())
    #encoders.encode_base64(payload) #encode the attachment

    #add payload header with filename
    #payload.add_header('Content-Decomposition', 'attachment', filename=attach_file_name)
    #message.attach(payload)

    #Create SMTP session for sending the mail
    session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
    session.starttls() #enable security
    session.login(sender_address, sender_pass) #login with mail_id and password
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()

    return 'some return data'


@app.route("/SendFeedback", methods=['GET', 'POST'])
def SendFeedback():

    UpdatedCredits = 11

    from datetime import datetime

    # datetime object containing current date and time
    now = datetime.now()

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    if request.method == 'POST':
        data = request.data
        data = str(data)
        data = data[2:-1];

    print('Data from form: '+ data)

    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.base import MIMEBase
    from email import encoders

    mail_content = data

    #The mail addresses and password
    sender_address = 'visualcalcstester@gmail.com'
    sender_pass = 'rzcqlxpgmftenryg'
    receiver_address = 'visualcalcstester@gmail.com'

    #Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    message['Subject'] = 'Feedback at ' + dt_string
    #The subject line

    #The body and the attachments for the mail
    message.attach(MIMEText(mail_content, 'plain'))
    #attach_file_name = 'Submitted Shape.json'

    #attach_file = data #open(attach_file_name, 'rb') # Open the file as binary mode
    #payload = MIMEBase('application', 'octate-stream')
    #payload.set_payload((attach_file).read())
    #encoders.encode_base64(payload) #encode the attachment

    #add payload header with filename
    #payload.add_header('Content-Decomposition', 'attachment', filename=attach_file_name)
    #message.attach(payload)

    #Create SMTP session for sending the mail
    session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
    session.starttls() #enable security
    session.login(sender_address, sender_pass) #login with mail_id and password
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()

    #Update the credits to 10.

#This function is called whenever the used analysis credits value needs to be incremented for an IP.
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    print('Analysis performed at IP: ', ip)

    import MySQLdb

    db = MySQLdb.connect(host="visualcalcs.mysql.pythonanywhere-services.com",  # your host
                         user="visualcalcs",       # username
                         passwd="as98safh98faea89",     # password
                         db="visualcalcs$SessionTracking")   # name of the database

    # Create a Cursor object to execute queries.
    cur = db.cursor()

    #First, we see if the ip address has accessed the tool before.
    SQLstring = "SELECT * FROM ipvisits WHERE ip_address=\'"+ip+"\';"

    cur.execute(SQLstring)

    #Print the first and second columns
    for row in cur.fetchall() :
        feedback_given = str(row[3])

    if(feedback_given != '1'):
        #update the database.
        SQLstring = "UPDATE ipvisits SET num_runs=" + str(UpdatedCredits) + " WHERE ip_address=\'"+ip+"\';"
        cur.execute(SQLstring)
        db.commit()

        #update the database.
        SQLstring = "UPDATE ipvisits SET feedback_given=1 WHERE ip_address=\'"+ip+"\';"
        cur.execute(SQLstring)
        db.commit()


    return 'some return data'



@app.route("/L489UIndiasII_d", methods=['GET', 'POST'])
def printOut_2():
 # Some fake data to work with:
# The data comes in the form of a simple list with the following format:

#1: 'line' or 'arc'
#2: x_min
#3: x_max
#4: m for line or x value of centroid for arc
#5: b for line or y value of centroid for arc
#6: empty for line, r for arc
#7: empty for line, rad start for arc
#8: empty for line, rad end for arc

#Lines defining a rectangle with corners at (5,5) and (0, 0):
#Note that vertical lines are just ignored and are not included here.

    print("----------------------Initiated New Analysis-------------------------------------")

    if request.method == 'POST':
        data = request.data
        data = str(data)

    print(data)

    import math

    #this function returns true if x is within y of anything in list z.
    def XisWithinYofZ(x,y,z):
        #Set a flag to false - if no closeness to vertical lines is found, this is never set to true.
        closenessFound = False
        #For all elements in z, make the check.
        for zElement in z:
            if x >= (zElement - y) and x <= (zElement + y):
                #print(x, ' is within +/- ',y, ' of ', zElement, '.')
                closenessFound = True
        return closenessFound

    def calcProperties(rects):
        #first, find the area:
        totalArea = 0
        sumXCentArea = 0
        sumYCentArea = 0

        for i in rects:
            totalArea += i[2]*i[3]
            xCentArea = i[2]*i[3]*i[0]
            yCentArea = i[2]*i[3]*i[1]
            sumXCentArea += xCentArea
            sumYCentArea += yCentArea

        #next, find the centroidx and centroid y values:
        xCentroid = sumXCentArea / totalArea
        yCentroid = sumYCentArea / totalArea

        #next, find the moment of interia of the area:
        #parallel axis theorem says that the total mom of inertia contribution is the indIx + Area * distance from centroid sqd.
        Ix = 0
        Iy = 0

        Ay2 = 0
        Ax2 = 0
        SumAxy = 0
        SumAx = 0
        SumAy = 0
        I0x = 0
        I0y = 0
        Ixy = 0

        for j in rects:
            indIx = (1/12)*j[2]*j[3]**3
            indIy = (1/12)*j[3]*j[2]**3

            Ix += indIx + j[2]*j[3]*((yCentroid - j[1])**2)
            Iy += indIy + j[2]*j[3]*((xCentroid - j[0])**2)

            #----New Below Here----#
            distfromcentroidy = j[1] - yCentroid;
            distfromcentroidx = j[0] - xCentroid;
            I0x = I0x + indIx
            I0y = I0y + indIy
            Ay2 = Ay2 + (j[2]*j[3])*distfromcentroidy**2
            Ax2 = Ax2 + (j[2]*j[3])*distfromcentroidx**2
            SumAxy = SumAxy + (j[2]*j[3])*(j[0]*j[1])
            SumAx = SumAx + (j[2]*j[3])*distfromcentroidx
            SumAy = SumAy + (j[2]*j[3])*distfromcentroidy

        Ixy = SumAxy - totalArea*xCentroid*yCentroid
        SecondPart = ((((Ix - Iy)/2)**2) + Ixy**2)**.5
        Ip1 = (Ix+Iy)/2 + SecondPart
        Ip2 = (Ix+Iy)/2 - SecondPart

            # reimanRects.append([xCentroid,yCentroid,b,h])

        if(abs(Ix-Iy) > .00001):
            Alpha = math.atan(-(2*Ixy)/(Ix-Iy))/2
        else:
            Alpha = math.atan(-(2*Ixy)/(Ix-Iy))/2
            #In this case, it is either 45 or 0. Probably 0. Only allow 45 if it is reaaaaaaaly close.
            print(Alpha)
            if abs(Alpha) < 0.78539:
                Alpha = 0

        Ixp = Ip1
        Iyp = Ip2

        propsRetArray = [xCentroid, yCentroid,totalArea,Ix,Iy, Alpha, Ixp, Iyp]
        return propsRetArray

    input = data   #,0.09374775213363444,1.069310430684135,0.22522522522522523,0.9406372653105501,'null','null','null'],['line',0.33104678205132376,1.069310430684135,0.5714285714285714,0.5704384160775612,'null','null','null'],['line',0.33104678205132376,1.1659878132431936,0.14736842105263157,0.7108221642557166,'null','null','null'],['line',1.1659878132431936,1.1961210233914716,-15.875,19.392708482495674,'null','null','null'],['line',0.9148777286742102,1.1961210233914716,0.19196428571428573,0.17467471827287903,'null','null','null'],['line',0.8897667202173118,0.9148777286742102,-8.6,8.21824703457194,'null','null','null'],['line',0.8897667202173118,1.113254695483707,0.16853932584269662,0.4162925575203646,'null','null','null'],['line',1.0956769895638783,1.113254695483707,-9.285714285714286,10.941284782879972,'null','null','null'],['line',0.6687898457966065,1.0956769895638783,0.3088235294117647,0.42877047334587015,'null','null','null'],['line',0.6286122322655692,0.6687898457966065,6.59375,-3.774524531761846,'null','null','null'],['line',0.21051394145821173,0.6286122322655692,-0.5855855855855856,0.7384936368767461,'null','null','null'],['line',0.1640585758129498,0.21051394145821173,-5.621621621621622,1.7986494321482809,'null','null','null'],['line',0.1640585758129498,0.7780227325841143,0.32515337423312884,0.8230299956482899,'null','null','null'],['line',0.10002550424785903,0.7780227325841143,0.2351851851851852,0.8930272919370151,'null','null','null'],['line',0.09374775213363444,0.10002550424785903,-7.2,1.6367354392613744,'null','null','null']]
    #first, define min and max x points overall:
    xMaxMinList = []

    #some data parsing...
    data = data[5:]
    data = data[:-4]

    input1 = list(data.split("],["))

    input = []

    for x in input1:
        y = list(x.split(","))
        input2 = []
        for k in y:
            k = k.replace("\\", "")

            k = k.replace("'", "")

            k = k.replace("[", "test")

            input2.append(k)
        input.append(input2)

    for i in input:
        if i[1] != 'vert':
            xMaxMinList.append(float(i[1]))
            xMaxMinList.append(float(i[2]))

    globalXMax = max(xMaxMinList)
    globalXMin = min(xMaxMinList)


    numberOfLines = 0;
    #Here we do a check to make sure the user hasn't spoofed a call with more than 4 lines (this is the function for demo mode):
    for l in input:
        if l[0] == 'line':
            numberOfLines += 1

    if numberOfLines > 4:
        return 0

    #Define number of divisions to be made (resolution of integration) 50000 is shown to work:
    divs =100000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/10000

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:

    reimanRects = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRects.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50
        #send out this data and draw the rectangles with Canvas. This will be an easy way to debug the reiman decomp.

    #retStr = ""

    '''
    for z in pointsCollector:
        retStr += str(z) + ','
'''

#Second time around is just for the rectangles to draw://////////////////////////////////////////////


    #Define number of divisions to be made (resolution of integration):
    divs = 1000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:


    reimanRectsfordisplay = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRectsfordisplay.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50



    PropsArray = calcProperties(reimanRects)

    for r in PropsArray:
        retStr += str(r) + ','

    for z in reimanRectsfordisplay:
        retStr += str(z) + ','

    retStr = retStr.replace("],[", ",")
    retStr = retStr.replace("]", "")
    retStr = retStr.replace("[", "")


    return retStr
    #return str(testVar)



@app.route("/printOut", methods=['GET', 'POST'])
def printOut():
 # Some fake data to work with:
# The data comes in the form of a simple list with the following format:

#1: 'line' or 'arc'
#2: x_min
#3: x_max
#4: m for line or x value of centroid for arc
#5: b for line or y value of centroid for arc
#6: empty for line, r for arc
#7: empty for line, rad start for arc
#8: empty for line, rad end for arc

#Lines defining a rectangle with corners at (5,5) and (0, 0):
#Note that vertical lines are just ignored and are not included here.

    #print("--Analysis Initiated---")

    if request.method == 'POST':
        data = request.data
        data = str(data)

    import math

    #this function returns true if x is within y of anything in list z.
    def XisWithinYofZ(x,y,z):
        #Set a flag to false - if no closeness to vertical lines is found, this is never set to true.
        closenessFound = False
        #For all elements in z, make the check.
        for zElement in z:
            if x >= (zElement - y) and x <= (zElement + y):
                #print(x, ' is within +/- ',y, ' of ', zElement, '.')
                closenessFound = True
        return closenessFound

    def calcProperties(rects):
        #first, find the area:
        totalArea = 0
        sumXCentArea = 0
        sumYCentArea = 0

        for i in rects:
            totalArea += i[2]*i[3]
            xCentArea = i[2]*i[3]*i[0]
            yCentArea = i[2]*i[3]*i[1]
            sumXCentArea += xCentArea
            sumYCentArea += yCentArea

        #next, find the centroidx and centroid y values:
        xCentroid = sumXCentArea / totalArea
        yCentroid = sumYCentArea / totalArea

        #next, find the moment of interia of the area:
        #parallel axis theorem says that the total mom of inertia contribution is the indIx + Area * distance from centroid sqd.
        Ix = 0
        Iy = 0

        Ay2 = 0
        Ax2 = 0
        SumAxy = 0
        SumAx = 0
        SumAy = 0
        I0x = 0
        I0y = 0
        Ixy = 0

        for j in rects:
            indIx = (1/12)*j[2]*j[3]**3
            indIy = (1/12)*j[3]*j[2]**3

            Ix += indIx + j[2]*j[3]*((yCentroid - j[1])**2)
            Iy += indIy + j[2]*j[3]*((xCentroid - j[0])**2)

            #----New Below Here----#
            distfromcentroidy = j[1] - yCentroid;
            distfromcentroidx = j[0] - xCentroid;
            I0x = I0x + indIx
            I0y = I0y + indIy
            Ay2 = Ay2 + (j[2]*j[3])*distfromcentroidy**2
            Ax2 = Ax2 + (j[2]*j[3])*distfromcentroidx**2
            SumAxy = SumAxy + (j[2]*j[3])*(j[0]*j[1])
            SumAx = SumAx + (j[2]*j[3])*distfromcentroidx
            SumAy = SumAy + (j[2]*j[3])*distfromcentroidy

        Ixy = SumAxy - totalArea*xCentroid*yCentroid
        SecondPart = ((((Ix - Iy)/2)**2) + Ixy**2)**.5
        Ip1 = (Ix+Iy)/2 + SecondPart
        Ip2 = (Ix+Iy)/2 - SecondPart

            # reimanRects.append([xCentroid,yCentroid,b,h])

        if(abs(Ix-Iy) > .00001):
            Alpha = math.atan(-(2*Ixy)/(Ix-Iy))/2
        else:
            Alpha = math.atan(-(2*Ixy)/(Ix-Iy))/2
            #In this case, it is either 45 or 0. Probably 0. Only allow 45 if it is reaaaaaaaly close.
            #print(Alpha)
            if abs(Alpha) < 0.78539:
                Alpha = 0

        Ixp = Ip1
        Iyp = Ip2

        propsRetArray = [xCentroid, yCentroid,totalArea,Ix,Iy, Alpha, Ixp, Iyp]
        #print('Ixy : ',Ixy)
        return propsRetArray

    input = data   #,0.09374775213363444,1.069310430684135,0.22522522522522523,0.9406372653105501,'null','null','null'],['line',0.33104678205132376,1.069310430684135,0.5714285714285714,0.5704384160775612,'null','null','null'],['line',0.33104678205132376,1.1659878132431936,0.14736842105263157,0.7108221642557166,'null','null','null'],['line',1.1659878132431936,1.1961210233914716,-15.875,19.392708482495674,'null','null','null'],['line',0.9148777286742102,1.1961210233914716,0.19196428571428573,0.17467471827287903,'null','null','null'],['line',0.8897667202173118,0.9148777286742102,-8.6,8.21824703457194,'null','null','null'],['line',0.8897667202173118,1.113254695483707,0.16853932584269662,0.4162925575203646,'null','null','null'],['line',1.0956769895638783,1.113254695483707,-9.285714285714286,10.941284782879972,'null','null','null'],['line',0.6687898457966065,1.0956769895638783,0.3088235294117647,0.42877047334587015,'null','null','null'],['line',0.6286122322655692,0.6687898457966065,6.59375,-3.774524531761846,'null','null','null'],['line',0.21051394145821173,0.6286122322655692,-0.5855855855855856,0.7384936368767461,'null','null','null'],['line',0.1640585758129498,0.21051394145821173,-5.621621621621622,1.7986494321482809,'null','null','null'],['line',0.1640585758129498,0.7780227325841143,0.32515337423312884,0.8230299956482899,'null','null','null'],['line',0.10002550424785903,0.7780227325841143,0.2351851851851852,0.8930272919370151,'null','null','null'],['line',0.09374775213363444,0.10002550424785903,-7.2,1.6367354392613744,'null','null','null']]
    #first, define min and max x points overall:
    xMaxMinList = []

    #some data parsing...
    data = data[5:]
    data = data[:-4]

    input1 = list(data.split("],["))

    input = []

    for x in input1:
        y = list(x.split(","))
        input2 = []
        for k in y:
            k = k.replace("\\", "")

            k = k.replace("'", "")

            k = k.replace("[", "test")

            input2.append(k)
        input.append(input2)

    for i in input:
        if i[1] != 'vert':
            xMaxMinList.append(float(i[1]))
            xMaxMinList.append(float(i[2]))

    globalXMax = max(xMaxMinList)
    globalXMin = min(xMaxMinList)

    #Define number of divisions to be made (resolution of integration) 50000 is shown to work:
    divs =100000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/10000

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:

    reimanRects = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRects.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50
        #send out this data and draw the rectangles with Canvas. This will be an easy way to debug the reiman decomp.

    #retStr = ""

    '''
    for z in pointsCollector:
        retStr += str(z) + ','
'''

#Second time around is just for the rectangles to draw://////////////////////////////////////////////


    #Define number of divisions to be made (resolution of integration):
    divs = 1000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:


    reimanRectsfordisplay = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRectsfordisplay.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50



    PropsArray = calcProperties(reimanRects)

    for r in PropsArray:
        retStr += str(r) + ','

    for z in reimanRectsfordisplay:
        retStr += str(z) + ','

    retStr = retStr.replace("],[", ",")
    retStr = retStr.replace("]", "")
    retStr = retStr.replace("[", "")


    return retStr
    #return str(testVar)

#########################################################################################
#########################################################################################
#########################################################################################

@app.route("/getArea", methods=['GET', 'POST'])
def getArea():
 # Some fake data to work with:
# The data comes in the form of a simple list with the following format:

#1: 'line' or 'arc'
#2: x_min
#3: x_max
#4: m for line or x value of centroid for arc
#5: b for line or y value of centroid for arc
#6: empty for line, r for arc
#7: empty for line, rad start for arc
#8: empty for line, rad end for arc

#Lines defining a rectangle with corners at (5,5) and (0, 0):
#Note that vertical lines are just ignored and are not included here.

    #print("--Analysis Initiated---")

    if request.method == 'POST':
        data = request.data
        data = str(data)

    import math

    #this function returns true if x is within y of anything in list z.
    def XisWithinYofZ(x,y,z):
        #Set a flag to false - if no closeness to vertical lines is found, this is never set to true.
        closenessFound = False
        #For all elements in z, make the check.
        for zElement in z:
            if x >= (zElement - y) and x <= (zElement + y):
                #print(x, ' is within +/- ',y, ' of ', zElement, '.')
                closenessFound = True
        return closenessFound

    def calcProperties(rects):
        #first, find the area:
        totalArea = 0

        for i in rects:
            totalArea += i[2]*i[3]

        propsRetArray = [0, 0,totalArea,0,0, 0, 0, 0]

        return propsRetArray

    input = data

    xMaxMinList = []

    #some data parsing...
    data = data[5:]
    data = data[:-4]

    input1 = list(data.split("],["))

    input = []

    for x in input1:
        y = list(x.split(","))
        input2 = []
        for k in y:
            k = k.replace("\\", "")

            k = k.replace("'", "")

            k = k.replace("[", "test")

            input2.append(k)
        input.append(input2)

    for i in input:
        if i[1] != 'vert':
            xMaxMinList.append(float(i[1]))
            xMaxMinList.append(float(i[2]))

    globalXMax = max(xMaxMinList)
    globalXMin = min(xMaxMinList)

    #Define number of divisions to be made (resolution of integration) 50000 is shown to work:
    divs =50000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1000

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:

    reimanRects = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue


        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRects.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50
        #send out this data and draw the rectangles with Canvas. This will be an easy way to debug the reiman decomp.

    #retStr = ""

    '''
    for z in pointsCollector:
        retStr += str(z) + ','
'''

#Second time around is just for the rectangles to draw://////////////////////////////////////////////


    #Define number of divisions to be made (resolution of integration):
    divs = 500

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:


    reimanRectsfordisplay = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRectsfordisplay.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50



    PropsArray = calcProperties(reimanRects)

    for r in PropsArray:
        retStr += str(r) + ','

    for z in reimanRectsfordisplay:
        retStr += str(z) + ','

    retStr = retStr.replace("],[", ",")
    retStr = retStr.replace("]", "")
    retStr = retStr.replace("[", "")


    return retStr
    #return str(testVar)


#########################################################################################
#########################################################################################
#########################################################################################
#This is the version of the backend that only calcs and returns area. No rects are sent to paint. That has been
#Moved to client side for increased 'snappiness'.

@app.route("/getArea_2", methods=['GET', 'POST'])
def getArea_2():


    #A quick check to see if the user has adequate credits remaining to run the analysis:

    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    import MySQLdb

    db = MySQLdb.connect(host="visualcalcs.mysql.pythonanywhere-services.com",  # your host
                         user="visualcalcs",       # username
                         passwd="as98safh98faea89",     # password
                         db="visualcalcs$SessionTracking")   # name of the database

    # Create a Cursor object to execute queries.
    cur = db.cursor()

    SQLstring = "SELECT * FROM ipvisits WHERE ip_address=\'"+ip+"\';"
    cur.execute(SQLstring)

    for row in cur.fetchall() :
        remainingCredits = row[1]
        feebackgiven = str(row[3])

    if remainingCredits <= 0 and feebackgiven == '0':
        return 'CreditsError'

    elif remainingCredits <= 0 and feebackgiven == '1':
        return 'CreditsErrorfb'


# The data comes in the form of a simple list with the following format:

#1: 'line' or 'arc'
#2: x_min
#3: x_max
#4: m for line or x value of centroid for arc
#5: b for line or y value of centroid for arc
#6: empty for line, r for arc
#7: empty for line, rad start for arc
#8: empty for line, rad end for arc

#Lines defining a rectangle with corners at (5,5) and (0, 0):
#Note that vertical lines are just ignored and are not included here.

    #print("--Analysis Initiated---")

    if request.method == 'POST':
        data = request.data
        data = str(data)

    import math

    #this function returns true if x is within y of anything in list z.
    def XisWithinYofZ(x,y,z):
        #Set a flag to false - if no closeness to vertical lines is found, this is never set to true.
        closenessFound = False
        #For all elements in z, make the check.
        for zElement in z:
            if x >= (zElement - y) and x <= (zElement + y):
                #print(x, ' is within +/- ',y, ' of ', zElement, '.')
                closenessFound = True
        return closenessFound

    def calcProperties(rects):
        #first, find the area:
        totalArea = 0

        for i in rects:
            totalArea += i[2]*i[3]

        propsRetArray = [0, 0,totalArea,0,0, 0, 0, 0]

        return propsRetArray

    input = data

    xMaxMinList = []
    #some data parsing...
    data = data[5:]
    data = data[:-4]
    input1 = list(data.split("],["))



    input = []

    for x in input1:
        y = list(x.split(","))
        input2 = []
        for k in y:
            k = k.replace("\\", "")

            k = k.replace("'", "")

            k = k.replace("[", "test")

            input2.append(k)
        input.append(input2)

    AnalysisID = input[-1][-1]

    for i in input:
        if i[1] != 'vert':
            xMaxMinList.append(float(i[1]))
            xMaxMinList.append(float(i[2]))

    globalXMax = max(xMaxMinList)
    globalXMin = min(xMaxMinList)

    #Define number of divisions to be made (resolution of integration) 50000 is shown to work:
    divs = 50000

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1000

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:

    reimanRects = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue


        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRects.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50
        #send out this data and draw the rectangles with Canvas. This will be an easy way to debug the reiman decomp.

    #retStr = ""


    for z in pointsCollector:
        retStr += str(z) + ','


#Second time around is just for the rectangles to draw://////////////////////////////////////////////


    #Define number of divisions to be made (resolution of integration):
    divs = 500

    #Define two thicknesses for elements.
    xWidthCoarse = (globalXMax - globalXMin)/divs
    xWidthFine = xWidthCoarse/1

    #Also, create a list of x values where vertical lines exist:
    vertXValues = []

    for l in input:
        if l[0] == 'line':
            if str(l[1]) == 'vert':
                vXValue = float(l[2])
                vertXValues.append(vXValue)

    #The list of x values at which intersections are checked is generated.
    #Every xValue within xWidth of a vertical line initiates an alternate xWidth of xWidth/1000 until x value of vertXValue + xWidth is reached.

    #first, set the intial xWidth and load first element:
    vLineClose = XisWithinYofZ(globalXMin,2*xWidthCoarse,vertXValues)
    if vLineClose == True:
        xWidth = xWidthFine
    else:
        xWidth = xWidthCoarse

    startList = (globalXMin + xWidth/2)
    endList = globalXMax
    xValues = []
    currentXValue = startList
    xSpacing = xWidth
    xValues.append([currentXValue, xSpacing])

    while currentXValue <= endList:
        #print('x Value: ',currentXValue)

        vLineClose = XisWithinYofZ(currentXValue,2*xWidthCoarse,vertXValues)
        if vLineClose == True:
            if xWidth == xWidthFine:
                xSpacing = xWidthFine
            elif xWidth == xWidthCoarse:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthFine
        else:
            if xWidth == xWidthCoarse:
                xSpacing = xWidthCoarse
            elif xWidth == xWidthFine:
                xSpacing = (xWidthCoarse + xWidthFine)/2
            xWidth = xWidthCoarse

        currentXValue += xSpacing


        xValues.append([currentXValue, xWidth])

    #print('xValues: ', xValues)

    #For each xvalue, find and list intercept locations with all lines:


    reimanRectsfordisplay = []

    retStr = ""

#The first time through this section is for calculating the actual properties, much higher resolution.

    #This array just picks up x and y locations of each detected intersection. Used for graphical debugging process.
    pointsCollector = []

    for xx in xValues:

        x = xx[0]
    #clear the array that stores y values for this location.

        yValuesAtCurrentXValue = []

        for l in input:
            if l[0] == 'line':
                if str(l[1]) != 'vert':
                    #Check if this x value is in the range of x values for that line.
                    if x >= float(l[1]) and x <= float(l[2]):
                        #if it is, find the y value for the x location.
                        y = float(l[3])*x + float(l[4])
                        yValuesAtCurrentXValue.append(y)
                        pointsCollector.append(x)
                        pointsCollector.append(y)
                    else:
                        continue
                else:
                    continue
            elif str(l[0]) == 'arc':
                #Check if this x value is in the range of x values for that arc.
                #A note about arcs - some of them are not a function, need to account for possibility of multiple y vals.
                if x >= float(l[1]) and x <= float(l[2]):
                    #if it is, find the y value for the x location.
                    arcData = l
                    #get values from arcData:
                    #0: 'line' or 'arc'
                    #1: x_min
                    #2: x_max
                    #3: m for line or x value of centroid for arc
                    #4: b for line or y value of centroid for arc
                    #5: empty for line, r for arc
                    #6: empty for line, rad start for arc
                    #7: empty for line, rad end for arc

                    xCentroid = float(arcData[3])
                    yCentroid = float(arcData[4])
                    radius = float(arcData[5])
                    radStart = float(arcData[6])
                    radEnd = float(arcData[7])

                    thetax = 0
                    between = False

                    #find two possible y values:
                    x0 = abs(x - xCentroid)

                    y0 = (radius**2 - x0**2)**.5
                    y1 = yCentroid + y0
                    y2 = yCentroid - y0

                    #Calculate theta0:
                    theta0 = math.atan((abs(y1 - yCentroid))/(abs(x - xCentroid)))

                    #The issue is with y1 - between is being set to true when not on arc.

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y1 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y1 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y1 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y1 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y1)
                        pointsCollector.append(x)
                        pointsCollector.append(y1)

                    between = False

                    #for y2:

                    #Calculate theta0:
                    theta0 = math.atan((abs(y2 - yCentroid))/(abs(x - xCentroid)))

                    #determine relative quadrant and adjust theta0
                    if (x > xCentroid) & (y2 > yCentroid):
                        thetax = theta0
                    elif (x < xCentroid) & (y2 > yCentroid):
                        thetax = math.pi - theta0
                    elif (x < xCentroid) & (y2 < yCentroid):
                        thetax = math.pi + theta0
                    elif (x > xCentroid) & (y2 < yCentroid):
                        thetax = 2*math.pi - theta0

                    if radStart >= radEnd:
                        if(thetax <= radStart) & (thetax >= radEnd):
                            between = True
                    if radEnd >= radStart:
                        if(thetax <= radStart):
                            between = True
                        elif(thetax >= radEnd):
                            between = True

                    if between == True:
                        yValuesAtCurrentXValue.append(y2)
                        pointsCollector.append(x)
                        pointsCollector.append(y2)

            else:
                continue
                   # print(yValuesAtCurrentXValue,',')

        #turn the y values list and the x value into a list of centroids, bases, and heights
        #Here is the format for this list:

        # 0: centroid,x
        # 1: centroid, y
        # 2: base
        # 3: height

        #order y values from largest to smallest:
        yValuesAtCurrentXValue.sort(reverse = True)

        #Only accept pairs. Idea here is that any wierd 3 sets will not matter
        #due to high element count.


        i = 0
        if len(yValuesAtCurrentXValue) !=3:
            #Try excluding doubles here. Do this by checking height. If it = 0, then you  have a double.
            while i < len(yValuesAtCurrentXValue)-1:
                xCentroid = x
                yCentroid = yValuesAtCurrentXValue[i] - (yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1])/2
                b = xx[1]
                h = yValuesAtCurrentXValue[i] - yValuesAtCurrentXValue[i+1]
                if h != 0:
                    i += 2
                    reimanRectsfordisplay.append([xCentroid,yCentroid,b,h])
                else:
                    i += 50



    PropsArray = calcProperties(reimanRects)

    for r in PropsArray:
        retStr += str(r) + ','

    #for z in reimanRectsfordisplay:
        #retStr += str(z) + ','

    retStr += str(AnalysisID)

    retStr = retStr.replace("],[", ",")
    retStr = retStr.replace("]", "")
    retStr = retStr.replace("[", "")

    #print(retStr)


    return retStr
    #return str(testVar)





if __name__ == "__main__":
    app.run()