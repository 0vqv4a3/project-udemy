const express = require("express");
const bodyParser = require("body-parser"); // parsing inputs value in form to key : value pairs in object
const cookieSession = require("cookie-session"); // cookie-session library is a middleware function like body-parser so we will use the use() method from express to implement it in all our Route Handling particulary this will add additional property to req object every time the follow up request was made by user for this Domain and will use it as authentication which user is signIn in this site as administrator
//import instance UserRepository from users.js inside repositories
const usersRepo = require("./repositories/users");

// app is an obj that all different thing a web server can do, it's created from express library
const app = express();
// .use() function applied  middleware func to all Route Handler, either is GET or POST or something else
// in this case bodyParser will parsing all req in every request Handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    key: ["32jg54ug5uy4g35gt4o3u2tg328"], // this key property is added so cookieSession library will encrypt the user ID inside the cookie, so malicious people can't pretend as different user to access this site as administrator or user
  })
);

//the first arg is anytime someone make request to the route(path) , '/' its the path
app.get("/", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <input name="passwordConfirmation" placeholder="password confirmation"/>
        <button>Sign Up</button>
    </form>
  </div>
  `);
});

// handling post request from the FORM
app.post("/", async (req, res) => {
  // destructuring email, password and passwordConfirmation from the FORM that user inputed and send as request
  const { email, password, passwordConfirmation } = req.body;
  // adding var for checking existing user email in users.json that match email variable above from destructuring the data from user input as request signUp
  const existingUser = await usersRepo.getOneBy({ email });

  // if existingUser is defined
  if (existingUser) {
    return req.send("Email in use");
  }
  // checking if password and passwordConfirmation that user signUp didn't match
  if (password !== passwordConfirmation) {
    return req.send("password not match");
  }

  // Create a user inside users repo to represent this person(user) that signUp
  const user = await usersRepo.create({ email, password }); // usersRepo.create() will return attrs(user) object with its unique ID
  // Store the id of that user inside the users Cookie

  res.send("Account succesly created!!!");
});

// the first arg is the PORT number on our machine
app.listen(3000, () => {
  console.log("listening");
});
