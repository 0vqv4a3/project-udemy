const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository require a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(filename);
    } catch (err) {
      fs.writeFileSync(filename, "[]");
    }
  }
}

const repo = new UsersRepository("users.json");
