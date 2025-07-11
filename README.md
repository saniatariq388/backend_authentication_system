Overview
This project consists of a frontend built using Next.js and a backend built with Node.js/Express using MongoDB as the database. This application allows users to sign up, sign in, and reset their password.

----------------------------------------------

Step : Clone Backend Repositry
git clone https://github.com/your-repository/backend_user_auth.git

----------------------------------------

Step :  Install Dependencies  Project setup

npm i // node modules

using Node.js n Express for setup   
npm i express   // express backend handle karta (routes, middlesware)
npm i  mongoose  // mongodb k sath interact krta
npm i bcryptjs   // password secure karta hash say
npm i dotenv   // .env ky liay keys ko secure karta
npm i cors   // cross origin resource sharing (CROS) enable karta frontend sy request anay ky liay
npm i body-parser // request  body ko pase karny json  data handle kar saky
npm i jsonwebtoken  //generate token 
mongodb integrate

----------------------------------

Step : Project Structure 
folders
routes
models
config

Main File
server.js // main entry point for running server

--------------------------------------------------------

Step : Setup Environment Variables
create a .env file in root of folder and adding variables
DB_URI = yur mongodb credentials
JWT_SECRET = your secret key 
port = 5000

Generate JWT secret key 

require("crypto").randomBytes(32).toString("hex")

Step 4: Run Backend server
node server.js  // main file to activate mongodb connection
you can see on http://localhost:5000

------------------------------------

config/db.js
import libraries
load env
dotenv.config()

mongodb connect
mongoose.connect(url)

------------------------------------
Backend Routes

POST /api/auth/signup: Sign up a new user.
Request Body: { name, email, password }
Response: Returns success or error message.

---------------------------------

POST /api/auth/signin: Sign in an existing user.
Request Body: { email, password }
Response: Returns the JWT token on success.

----------------------------------

POST /api/auth/forgot-password: Send a reset password email link (for your use case).
Request Body: { email }
Response: Sends a reset password email or returns error.

------------------------------

Controller/ authControllre.js

user authentication system through
JWT and bcryptjs

sign up   // for new user by generating jwt token

signin   // for existing user by id

forgot password   // for reset password through token received by email

----------------------------

models/userInfo.js

schema define for user's structure
new mongoose.Schema({})

--------------------------

insertStaticUsers.js 

for static user collection 
then add users from frontend



