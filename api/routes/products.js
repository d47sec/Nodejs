const express = require('express');
const { route } = require('../../app');
// const { router } = require('../../app');

const router = express.Router(); 
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling GET request to /products"
    });
});


router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name, 
    //     price: req.body.price
    // };
    // từ đây là sử dụng database để lưu trữ data 
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name,
        price : req.body.price
    });
    product
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    // console.log(product);
    res.status(201).json({ 
        message: "Handling POST requests to /products",
        createProduct: product
    });
});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findOne(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
    // if(id === 'special'){
    //     res.status(200).json({
    //         message: "You discovered the special ID"
    //     });
    // }else{
    //     res.status(200).json({
    //         message: "You passed an ID"
    //     });
    // }
});

router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: "Updated product!"
    });
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: "Deleted product!"
    });
});

module.exports = router;