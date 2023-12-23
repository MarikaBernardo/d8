import express  from "express";
import { Product } from "./Models/Products.js"
import { Brand } from "./Models/Brands.js"
import { checkAuth } from "./middlewares/checkAuth.js";


const productRoute = express.Router();

productRoute.get("/", checkAuth, async (req, res, next) => {
    try {
        const{limit, skip, sort,sortBy, order,} = req.query;
        const products = await Product.find({}).populate("brand")
        res.json(products);
    } catch (error) {
        next(error);
    }
});

productRoute.put("/:id", checkAuth, async (req,res, next) => {

    try {  const UpdatedProduct = await Product.findByIdAndUpdate (req.params.id, req.body, { new : true} )
    res.json (UpdatedProduct);
        
    } catch (error) {
        next(error);
        
    }
    });
    

    productRoute.delete("/:id", checkAuth, async (req, res, next) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                res.status(404).send();
            } else {
                res.status(204).send();
            }
        } catch (error) {
            next(error);
        }
    });
    

    productRoute.post("/", checkAuth, async (req, res, next) =>{
        try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        
        res.status(201).send(newProduct);
        } catch (error) {
        next(error);
        }
        
        });





export default productRoute