const fs = require("fs")
const path = require("path")
let name = "parse"
let newDir = name
let newFile = name + ".js"
function createDir() {
    let currentDirList = fs.readdirSync(__dirname)
    // console.log(currentDirList);
    currentDirList.forEach(item => {
        // console.log(item);
        if (item == newDir) {
            console.log("目录已经存在")
        } else {
            fs.mkdir((newDir), (err) => {
            })
        }
    })
}
function createFile(){
    let currentDirList = fs.readdirSync(__dirname + "/" + newDir)
    console.log(currentDirList);
   if(currentDirList.length>0){
       currentDirList.forEach(item =>{
           if(item == newFile){
               console.log("文件已经存在")
           }else{
               fs.writeFile(path.join(__dirname + "/" + newDir + "/" + newFile), "", "utf8", (err) => {
                   // console.log(err,11)
               })
           }
       })
   }else{
       fs.writeFile(path.join(__dirname + "/" + newDir + "/" + newFile), "", "utf8", (err) => {
           // console.log(err,11)
       })
   }
}
createDir()
createFile()
