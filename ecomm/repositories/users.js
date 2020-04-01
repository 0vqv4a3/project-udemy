const fs = require("fs"); // filesystem module from nodejs.org/api
const crypto = require("crypto"); // crypto module nodejs.org

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
        encoding: "utf8"
      })
    );
  }

  // create an account with the data from user Sign Up, by writing the data inside this.filename(json file) so it will be recorded in server
  // attrs(attribute) the data that being returned from user sign Up like {email: dars@gmail.com, password:'a1233as'}
  async create(attrs) {
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs); // records is an array of object
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
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);

    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);

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
}

const test = async () => {
  const repo = new UsersRepository("users.json");

  await repo.update("19a55f97", { pass: false });
};

test();
