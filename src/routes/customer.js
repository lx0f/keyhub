const express = require("express");
const FAQs = require("../models/FAQs");
const customerRouter = express.Router();
const customerFAQRouter = require("./customer_FAQ")

/*customerRouter.use((req, res, next) => {
  if (!req.isAuthenticated()) {
      return res.redirect("/login")
  }
  
  next()
})*/

/** FAQs Customer Site**/

  
customerRouter.use((req, res, next) => {
  res.locals.path = req.baseUrl;
  console.log(req.baseUrl);
  next();
});

customerRouter.use("/faqs", customerFAQRouter)

customerRouter.route("/logout").get((req, res) => {
  req.logOut();
  res.redirect("/login")
})

customerRouter.route("/").get((req, res) => {
  res.render("./customers/page-index-3");
});


module.exports = customerRouter;
