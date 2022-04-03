RPA app instation guide

step 1 : git close git_repo_url

step 2 :  open mysql / xamppp

step 3 :  create db-   nodejs_login

step 4 : upload db file in xampp database_backup/nodejs_login.sql

step 5 : update mysql creadition in config/database.js

  'connection':{
  'host':'localhost',
  'user':'root',
  'password':''
 },
 'database':'nodejs_login',
 'user_table':'users'

step 6 : open cmd / any 

step 7 : npm install

step 8: node server

step 9: http://localhost:5000

step 10: http://localhost:5000/login
        username: sandeepnath
        password: sandeepnath

