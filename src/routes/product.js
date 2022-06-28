const express = require("express");
const db = require("../models/database_setup");
const Products = require("../models/product");
const productRouter = express.Router()
const product = require("../models/product")

//const productIDtest = 0
productRouter.get('/', (req, res) => {
    console.log("Product Render")
    res.render('./staff/staff-productCreate');
});

productRouter.post('/', async function (req, res) {
    let { name,description,category,stock,price } = req.body;
    
    const products =  await (await product.findAll({attributes: ["name","id"]})).map((x)=>x.dataValues)
    productID = 1
    
    
    if (products.length==0) {
        productID = 1
    }
    else{
        //console.log("ID IS HERE",products[products.length-1]["productID"])
        productID = products[products.length-1]["productID"] + 1
        //console.log("AFTER",productID)
    }
    flag = true
    for (let index = 0; index < products.length; index++) {
        const usedName = products[index]["name"].toUpperCase()
        
        if (usedName.toUpperCase()==name.toUpperCase()){
            flag = false
            
        }
    }
    if (flag) {
        product.create({
            name,description,category,stock,price
            //list of attributes
        })
        req.flash("success",name," has been successfully added!")
        // req.flash("success",name,description,category,stock,price,"ID:",productID)
    }
    else{
        req.flash("error",name," is already a product!")
    }
    res.redirect("/staff/product")
    });

productRouter.post('/delete', async function (req, res) {
    let { productID } = req.body;
    //console.log("PRODUCT ID:",productID)
    const value = await Products.findOne({where: {productID: productID}})
    const name = value["name"]
    const removeProduct = await Products.destroy({ where: {productID: productID}})
    //console.log("I AM HERE",products)
    req.flash("success",name," has been successfully removed.")
    res.redirect("/staff/product/check");
});

productRouter.get('/check',async (req,res)=>{
    const products =  await (await product.findAll()).map((x) => x.dataValues);
    return res.render("./staff/staff-productCheck",{ products });
});

productRouter.get('/update',async (req,res)=>{
    let { productID } = req.body;
});
module.exports = productRouter