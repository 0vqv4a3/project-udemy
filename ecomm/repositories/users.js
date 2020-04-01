const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository require a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
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
        encoding: "utf8"
      })
    );
  }

  // create an account with the data from user Sign Up, by writing the data inside this.filename(json file) so it will be recorded in server
  // attrs(attribute) the data that being returned from user sign Up like {email: dars@gmail.com, password:'a1233as'}
  async create(attrs) {
    const records = await this.getAll();
    records.push(attrs); // records is an array of object

    // write the updated 'records' back to this.filename
    fs.promises.writeFile(this.filename, JSON.stringify(records)); //JSON.stringify()convert js value to Javascript Object Notation(JSON) string
  }
}
const test = async () => {
  const repo = new UsersRepository("users.json");

  const users = await repo.getAll();

  console.log(users);
};

test();
