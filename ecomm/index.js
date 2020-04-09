const express = require("express");
const bodyParser = require("body-parser"); // parsing inputs value in form to key : value pairs in object
//import instance UserRepository from users.js inside repositories
const usersRepo = require("./repositories/users");

// app is an obj that all different thing a web server can do, it's created from express library
const app = express();
// .use() function applied  middleware func to all Route Handler, either is GET or POST or something else
// in this case bodyParser will parsing all req in every request Handler
app.use(bodyParser.urlencoded({ extended: true }));

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
  // Store the id of that user inside the user Cookie

  res.send("Account succesly created!!!");
});

// the first arg is the PORT number on our machine
app.listen(3000, () => {
  console.log("listening");
});
