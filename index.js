const ffmetadata = require('ffmetadata');
const fs = require('fs');
const path = require('path');

const INFO = "\u001B[1;36m [ INFO ] \u001B[0;0m";
const ERR  = "\u001B[1;31m [ ERROR ] \u001B[0;0m";

let folder = '../test';
let files = fs.readdirSync(folder);

/**
 * Function to extract data from all the files in the input directory
 * @param {Array} files - List of Files in input_directory.
 * @param {String} input_directory - Path to input directory.
 */
function scanDir(files,input_directory,regex){
    let count = files.length;
    let i = 0;
    for(let file of files){
        let song = path.join(input_directory,file);
        ffmetadata.read(song,(err, data) => {
            let newData = {
                title: data.title.replace(regex,'')
            };
            ffmetadata.write(song,newData,(err) => {
                i++;
                if(err){
                    console.log(`${ERR} : Write Error`);
                }else{
                    console.log(`${INFO} : ${song} changed [ ${i} / ${count} ]`);
                }
            });
        });
    }
}

/**
 * Function to list titles
 * @param {Array} files - List of Files in input_directory.
 * @param {String} input_directory - Path to input directory.
 */
function list(files,input_directory){
    for(let file of files){
        let song = path.join(input_directory,file);
        ffmetadata.read(song,(err, data) => {
            console.log(data.title);
        });
    }
}


// /(www.)[\w\W\s\S]*/;

if(process.argv[2] == 'list'){
    list(files,folder);
}else{
    let regex = new RegExp(process.argv[2]);
    scanDir(files,folder,regex);
}
