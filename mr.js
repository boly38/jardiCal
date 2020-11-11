var mongoTools = require("node-mongotools");

mongoTools.mongorestore({
   dumpPath:'backup/myDatabase__2020-11-8_160434.gz',
   port: 37017,
   userName:'root', password:'mypass', authenticationDatabase:'admin'
})
.then((success) => {
  console.info("success", success.message);
  if (success.stderr) {
    console.info("stderr:\n", success.stderr);
  }
})
.catch((err) => console.error("error", err) );