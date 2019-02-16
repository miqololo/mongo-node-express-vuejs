# Run mongodb

  - Install mongodb in your envoirment (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
  - start mongo db sudo service mongod start

# Run project
  - go to directory back in root project folder
  - run npm install command for install node dependencies
  - open config/index.js
  - you can see this configuration json file 
    - port: node project port (default 3000)
    - monogoDb.host:  host on which runed mongodb
    - monogoDb.port:  port on which runed mongodb
    - monogoDb.database:  database name for our ptoject
    - mongoDb.username: username for auth in mongo if need authentication
    - mongoDb.password: password for auth in mongo if need authentication
    - apiKey is unique string for authorize our api calls
    - defaultPageLimit is for give default count of items in list
- after config the properties run in back folder node server which will start the project on port that you write in cofiguration file 

# Api docs
- You can find information about endpoints in client_api.postman_collection.json file which should be imported to postman
- And after run project you can find it by url <api_url>/api-docs