const express = require("express");

// app is an obj that all different thing a web server can do, it's created from express library
const app = express();

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

const bodyParser = (req, res, next) => {
  if (req.method === "POST") {
    // get access to email, password and passwordConfirmation
    // res.on is similliar to element.addEventListener, in here on == addEventListener, the event is 'data'
    // the data that we receive is a raw data type of HEX value inside buffer object, so we need to parse it
    req.on("data", data => {
      const parsed = data.toString("utf8").split("&");
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split("=");
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

// body is middleware function
app.post("/", bodyParser, (req, res) => {
  console.log(req.body);
  res.send("Account succesly created!!!");
});

// the first arg is the PORT number on our machine
app.listen(3000, () => {
  console.log("listening");
});
