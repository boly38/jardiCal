var mongoTools = require("node-mongotools");

mongoTools.mongodump({
   db:'myDatabase',
   port: 37017,
   path:'backup',
   userName:'root', password:'mypass', authenticationDatabase:'admin'
})
.then((success) => console.info("success", success) )
.catch((err) => console.error("error", err) );