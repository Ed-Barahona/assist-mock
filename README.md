# assist-mock

Usage:
Change the FB URL in the Facebook APP config file to "HOST_URL/facebook/" ie; "assist-mock.narvar.qa/facebook/

* The facebook App has /me/messages built into the app, only the Host URL is configurable via the configuration file.

# Install 
npm install
npm start

# Available endpoints:

## POST:

Post messages:

/facebook/me/messages

Example: http://assist-mock.narvar.qa/facebook/me/messages

## GET: 

Get message list:

/facebook/me/messages

Reset messages

/facebook/me/messages/reset

Get current count

/facebook/me/count

Reset count

/facebook/me/count/reset

Reset both messages and count

/facebook/me/reset 
