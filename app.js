const express = require("express");
const bodyParser = require("body-parser");

/*
change certain parts of the html page according to the logic on the server side : templating -->ejs
*/

// to use any of the view engine place all the ejs files in "views" folder. View engine looks there and looks for files

const app = express();
var items = ["Buy Food", "Cook food", "Eat food"];
var workItems = [];
app.set("view engine", "ejs");  // use ejs as view engine
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); // express accesses static files from public folder
app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {     // render the list file, works with the ejs file.
                           // first parameter is ejs filename, varInEjsFileToBeReplaced : varOnServerSide
    listTitle: day,       // all the varibles that need to be rendered inside list.ejs file need to be passed here
    newItemList: items
  });

});

app.post("/", function(req, res) {
 let  item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work"); // send get request to work route
  }
  else{
    items.push(item);
    res.redirect("/"); // send get request to root route, can be also thought as function call
  }
});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItemList: workItems
  })
})
// app.post("/work", function(req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// })

app.listen(3000, function() {
  console.log("Server started at port 3000");
});
