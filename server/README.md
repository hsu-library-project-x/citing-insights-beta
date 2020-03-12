

Version: Beta

Citing Insights Server Installation
=====
Citing Insights is a web application to assess student papers. Our tool is designed to run on a remote Linux server and enables:
The ability to access the Citing Insights tool from any computer in any location
Allowing many users to share access the more powerful resources on a well equipped server
Centralized installation and configuration of packages, supporting libraries, etc..
### Requirements
While our application has the capability to run on a Windows and Mac Server, Citing Insights (and our documentation) is in regard to a Linux server 
## Installing Citing Insights
The following are all UNIX commands, to be typed in a terminal.  
### Install Node.JS
Install a version of Node.js on the server. Following the steps from the Node.js website (https://nodejs.org/en/).  
### Install MongoDB
Install MongoDB on the server, access MongoDB installation documentation (https://docs.mongodb.com/manual/administration/install-on-linux/)  and choose your Linux distribution for instructions to install on your server.  
### Install Anystyle
Citing Insights requires the Anystyle.io software to parse academic references. Anystyle.io requires that the Ruby programming language  is available on the server to install the Anystyle Gem.

  * First, install Ruby from the Ruby Homepage 
(url: https://www.ruby-lang.org/en/documentation/installation/ )

  * Then, install Anystyle by typing  `[sudo] gem install anystyle-cli` into the terminal. 

### Clone the Repository
Clone the repository by typing into the terminal:

`git clone https://github.com/hsu-library-project-x/citing-insights-beta.git`

### Install Dependencies in Client Directory

To install dependencies, navigate inside the citing-insights-beta directory, created through the previous clone command. Then navigate to the client directory using these two commands. 

`cd citing-insights-beta`

`cd client`

Install all necessary dependencies for the client side of the application by running the following command. Please make sure you’re in the client directory. 

`npm install`

### Install Dependencies in Server Directory

Assuming, you just installed dependencies in the client directory navigate to the server directory using the following commands. 

`cd ..`  
`cd server`

Then install dependencies on the server using the command

`npm install`

### Obtaining Google API Credentials
Citing Insights requires Google to log in and out of the application. In order for the Citing Insights log in to work for your institution, you need to obtain Google API Credentials. To get credentials go to console.developers.google, create a new project, and enable (it is free, but need to use a credit/debit card to register) to both Google Analytics API and Identity Toolkit API
Be sure to click the Credentials tab on the left and set the correct Redirect URI’s, as instructed by Google. 

Back in the application’s directory, navigate to citing-insights-beta/server/config.js,
And in the field for clientId: “”, place in the empty quotes your ClientID as assigned by Google, as well as your Client Secret key being put in the clientSecret: “” empty quotes. 
Similarly, in citing-insights-beta/client/src/config.json, place your ClientID into the empty field. 


### Starting the Application

To run the application locally and in development mode, type into the terminal:

`npm run dev`

This will launch the server at http://localhost:5000

And the client (React application) at http://localhost:3000

To stop the servers, press CTRL + C in the terminal that you are running `npm run dev` in.
Note: This configuration is running nodemon, which allows for the server to restart any time it detects a change in a file(hot reloading). So, no need to bring down and bring up the server each time a change is made to a file, simply saving the file suffices.

To deploy the application non-locally, follow the documentation here

https://create-react-app.dev/docs/deployment/
