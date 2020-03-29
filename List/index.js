#!/usr/bin/env node

/* adding this comment (#!/usr/bin/env node) on top of index.js file so it will 
tell our computer that we want to use node to execute this file as suppose to execute it diretcly */

/* make ls command line like linux based CLI that read the file in user directory filesystem with nodejs.org library */
// import fs(filesystem module) from Nodejs.org/api it's standard library for node.js
const fs = require("fs");

// run readdir() in fs object for reading all file inside a directory, Note: process.pwd() Current Working Directory(cwd)
// the same as saying search current working directory from where exactly this program(index.js) excecuted from.
fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    const index = filenames.indexOf(filename);

    // checking the stat of a single file or folder
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      allStats[index] = stats;

      const ready = allStats.every(stats => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }
    });
  }
});
