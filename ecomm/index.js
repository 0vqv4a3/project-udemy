const express = require("express");
const bodyParser = require("body-parser"); // parsing inputs value in form to key : value pairs in object

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

// body is middleware function
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account succesly created!!!");
});

// the first arg is the PORT number on our machine
app.listen(3000, () => {
  console.log("listening");
});