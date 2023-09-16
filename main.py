from flask import Flask, make_response, render_template, request, redirect, send_from_directory
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *

import os
import random

app = Flask(__name__, static_url_path='/static')


@app.route('/src/<path:filename>')
def serve_static(filename):
    return send_from_directory('src', filename)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('index.html', prct=prct, prct2=prct2))
    return response


@app.route('/tools')
def tools():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('tools.html', prct=prct, prct2=prct2))
    return response


@app.route('/admin')
def admin():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('admin.html', prct=prct, prct2=prct2))
    return response


@app.route('/store')
def store():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('store.html', prct=prct, prct2=prct2))
    return response


@app.route('/guides')
def guides():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('guides.html', prct=prct, prct2=prct2))
    return response


@app.route('/sent')
def sent():
    prct = getpercent()
    prct2 = getpercent()
    response = make_response(render_template('sent.html', prct=prct, prct2=prct2))
    return response


@app.route('/privacy')
def privacy():
    prct = getpercent()
    response = make_response(render_template('privacy.html', prct=prct))
    return response


@app.route('/send-email', methods=['POST'])
def send_email():
    form_id = request.form['form_id']
    if form_id == "contact":
        subj = 'Contact Us Response'
    else:
        subj = 'Job Inquiry'
    name = request.form['name']
    emailaddress = request.form['email']
    message = request.form['message']
    msgbody = ("From: " + name + ", " + emailaddress + "<br>" + message)

    msg = Mail(
        from_email='mrsnaught@gmail.com',
        to_emails='mrsnaught@gmail.com',
        subject=subj,
        html_content=msgbody)
    try:

        # Add SendGrid API key to .yaml file and env variable.

        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(msg)
    except Exception as e:
        print(str(e))
    return redirect('/sent')


@app.route('/getpercent')
def getpercent():
    number = random.randint(1, 100)
    return number


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4242, debug=True)
