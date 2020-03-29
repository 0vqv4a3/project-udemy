/* make ls command line like linux based CLI that read the file in user directory filesystem with nodejs.org library */
// import fs(filesystem module) from Nodejs.org/api it's standard library for node.js
const fs = require('fs');

// run readdir() in fs object for reading all file inside a directory, Note: process.pwd() Current Working Directory(cwd)
// the same as saying search current working directory from where exactly this program(index.js) excecuted from. 
fs.readdir(process.cwd(), (err, filesname) => {

    if (err) {
        console.log(err);
    }
    console.log(filesname);
});