const express = require("express");
const bodyParser = require("body-parser"); // parsing inputs value in form to key : value pairs in object
const cookieSession = require("cookie-session"); // cookie-session library is a middleware function like body-parser so we will use the use() method from express to implement it in all our Route Handling particulary this will add additional property its session property with value of an object To "req" object in ROUTE handler every time the follow up request was made by user for this Domain and will use it as authentication which user is signIn in this site as administrator
//import instance UserRepository from users.js inside repositories
const usersRepo = require("./repositories/users");

// app is an obj that all different thing a web server can do, it's created from express library
const app = express();

// .use() function applied  middleware func to all Route Handler, either is GET or POST or something else
// in this case bodyParser will parsing all req in every request Handler
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ["hjlkjh3452hk3h4"],
    // this key property is added so cookieSession library will encrypt the user ID inside the cookie, so malicious people can't pretend as different user to access this site as administrator or user>> Note : the array of string is encryption key used to encode cookie data its just a random string nothing in particular but if the array of string is changed it will automatically change the encryption of cookie-session library for our cookies
  })
);

//the first arg is anytime someone make request to the route(path) , '/' its the path
app.get("/signup", (req, res) => {
  res.send(`
  <div>
    Your Id is: ${req.session.userId}
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
    return res.send("Email in use");
  }
  // checking if password and passwordConfirmation that user signUp didn't match
  if (password !== passwordConfirmation) {
    return res.send("password must match");
  }

  // Create a user inside users repo to represent this person(user) that signUp
  const user = await usersRepo.create({ email, password }); // usersRepo.create() will return attrs(user) object with its unique ID

  // Store the id of that user inside the users Cookie
  req.session.userId = user.id; // Note the userId is just random key name for storing the user id to session object so the name is optional any key name is valid, for readeable purpose userId is make sense instead other key name.

  // whenever res.send() is called the cookie-session library will automatically take all the information inside that we change & encode it as a simple string and attach it to Outgoing Response as the cookie that should be stored on the users browser
  res.send("Account succesly created!!!");
});

app.get("/signout", (req, res) => {
  req.session = null;
  return res.send("You're logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
          <input name="email" placeholder="email"/>
          <input name="password" placeholder="password"/>
          <button>Sign In</button>
      </form>
    </div>
`);
});

// the first arg is the PORT number on our machine
app.listen(3000, () => {
  console.log("listening");
});
