const fs = require("fs"); // filesystem module from nodejs.org/api
const crypto = require("crypto"); // crypto module nodejs.org
const util = require("util"); // adding it to use promisify fucnt to make normal function with callback to return a function based promise so the callback didn't required

// util.promisify() : used Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.
const scrypt = util.promisify(crypto.scrypt);
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository require a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename); //search file with the name this.filename inside server harddrive
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    // Open the file called this.filename
    // Read it's content
    // Parse the content
    // Return the parsed data
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  // create an account with the data from user Sign Up, by writing the data inside this.filename(json file) so it will be recorded in server
  // attrs(attribute) the data that being returned from user sign Up like {email: dars@gmail.com, password:'a1233as'}
  async create(attrs) {
    // attrs is {email:'', password:''}
    attrs.id = this.randomId();
    // generate Random salt
    const salt = crypto.randomBytes(8).toString("hex");

    // buffer object is a raw data in binary format so it needed to convert it to string
    // use scrypt promise based funct from nodejs.org/api it will return a buffer object & scrypt is used for adding password with salt and Hashing it with hashing algorithm,
    const buf = await scrypt(attrs.password, salt, 64); // the last arg is callback but scrypt funct has been promisified by util.promisify() (look at top section), so the callback is removed as for the the last arg 64

    const records = await this.getAll();
    const record = {
      ...attrs,
      //this will overwrite the password in attrs that user inputed in form
      password: `${buf.toString("hex")}.${salt}`,
      // the period(.) is added to separate the salt from buf(hashed password+salt) and later on if we want to compare the password that the user inputed we can know from where is hased password is started and its end, and to retrive the salt to join it with user password that sign back in after sign up, because the salt is randomisized everytime its called so it needed to store it alongside the password
    };
    records.push(record); // records is an array of object

    await this.writeAll(records); // it will store it in users.json

    return record; // returning record obj so the ID for this user can be used inside post handling request inside index.js for SignUp Cookie authentication
  }

  async writeAll(records) {
    // write the updated 'records' back to this.filename(json file)
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
    //JSON.stringify()convert js value to Javascript Object Notation(JSON) string
    // the second arg inside stringify is json function formater but now its just null,
    // the third arg is the indentation so it will not printed in one line
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  // find user with specified "id"
  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);

    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} is not found`);
    }

    /* 
    //record and records[0] is the same obj, because record just take the refference of obj inside records[0],
    // so if record assigned new property it will automatically updated inside records[0], cause there is just one object
    // if (record === records[0]) {
    //   console.log("same refference");
    // } */
    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  // getOneBy(filters) will find user object inside users.json repositories that match the filter object key: value pairs
  // filters obj like {password: 'mypassword'} to search all user with key password and value "mypassword"
  async getOneBy(filters) {
    const records = await this.getAll();

    //this for loop for iterate array of object inside users.json
    for (let record of records) {
      let found = true;
      // this for in loop to iterate all key inside filters obj that passed as parameter to search its matching key:value pairs inside record
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }
}

// exports an instance of UserRepository instead its class because if its added in another file there is typo in the instance UserRepository parameter(json filename), there will be 2 or more json file that surely we didn't want to happen
// and we just need one json file for signUp and signIn
module.exports = new UsersRepository("users.json");
