#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const chalk = require('chalk');
const path = require('path'); //i will use path.join() later
//Method #2 for wrapping fs.lstat inside a Promise
// const lstat = util.promisify(fs.lstat);

//Method #3 wrapping fs.lstat inside a promise
const {
    lstat
} = fs.promises;

// process.argv return an array containing command line arg in index 2 in this array so we can access nls with added arg like '../' or '/' for accesing current folder or its root folder or '~/' homefolder,
// this array tell us how our program is executed
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename)); // join arg from command line plus the file name so it become a pathfullname
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.blue.bold(filenames[index]));
        }

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