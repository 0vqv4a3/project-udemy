#!/usr/bin/env node
// debounce, chokidar & caporal are packages from npmjs.com
// fs(filesystem module) is from nodejs.org/api node standard library
const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
const { spawn } = require("child_process"); // this will allowed nodejs program to start another program in our computer

// build a helper. Note : arguments inside '[]' is optional different from inside '< >' is required or it will throw an error
program
  .version("0.0.1")
  .argument("[filename]", "Name of file to executed")
  .action(async ({ filename }) => {
    const name = filename || "index.js"; // check if user passing filename arg if not the default file to execute will be index.js

    try {
      await fs.promises.access(name); // check if name(the file that will be executed is exist in current dir)
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    // add debounce so 'add' event didn't executed constuctivly
    const start = debounce(() => {
      spawn("node", [name], { stdio: "inherit" });
    }, 2000);

    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });
program.parse(process.argv);
