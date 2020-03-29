#!/usr/bin/env node

/* adding this comment (#!/usr/bin/env node) on top of index.js file so it will 
tell our computer that we want to use node to execute this file as suppose to execute it diretcly */

/* make ls command line like linux based CLI that read the file in user directory filesystem with nodejs.org library */
// import fs(filesystem module) from Nodejs.org/api it's standard library for node.js
const fs = require("fs");
const util = require("util");

//Method #2 for wrapping fs.lstat inside a Promise
const lstat = util.promisify(fs.lstat);

// Method #3 for wrapping fs.lstat inside a Promise with inbuild fs object promise implementation
// const lstat = fs.promises.lstat; // or like below
// const { lstat } = fs.promises;

// run readdir() in fs object for reading all file inside a directory, Note: process.pwd() Current Working Directory(cwd)
// the same as saying search current working directory from where exactly this program(index.js) excecuted from.
fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  for (let filename of filenames) {
    const stats = await lstat(filename);

    console.log(filename, stats.isFile());
  }
});

//Method #1 for wrapping fs.lstat inside a promise
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
