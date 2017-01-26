//Initialization
const router = require("express").Router()
    , mainModel = require("../models/main");



//Home page
router.get("/", function(req, res, next) {

  console.log("- Controller => \'/\' main page");
  var result = mainModel.getHelloWorld();

  if(result!=null){
    res.format({
      html: () => {
        res.render("main/index", {
            title: "MVC Skeleton Node.js",
            data: result
          }
        );
      },
      json: () => {
        res.send({
          status: 'success',
          data: result
        });
      }
    });
  }
  else{

    let err = new Error('Bad Request');
    err.status = 400;
    return next(err);
  }
});



module.exports = router;
