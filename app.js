const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
mongoose.connect('mongodb+srv://dat:dat123456@nodejs-restapi.fg3cr.mongodb.net/NodeJS-RESTAPI?retryWrites=true&w=majority',
    {
        useMongoose: true 
    }
);


app.use(morgan('dev'));
// parsing the body
// xử lí phần body của requests 
app.use(bodyParser.urlencoded({extented:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // khai báo các nguồn được truy cập , * có nghĩa là từ bất kì nguồn nào 
    res.header("Access-Controle-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// xử lí lỗi 
app.use((req, res, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ 
        error: {
            message : error.message
        }
    });
});


module.exports = app;

// RESTful API LÀ MỘT TIÊU CHUẨN DÙNG TRONG VIỆC THIẾT KẾ API CHO CÁC ỨNG DỤNG WEB ĐỂ TIỆN QUẢN LÍ CÁC RESOURCE  

// CHỨC NĂNG QUAN TRỌNG NHẤT CỦA REST LÀ QUY ĐỊNH CÁCH SỬ DỤNG CÁC HTTP METHOD(GET, POST, PUT, DELETE, OPTIONS) VÀ CÁCH ĐỊNH DẠNG CÁC URL CHO ỨNG DỤNG WEB ĐỂ QUẢN LÍ CÁC RESOURCE

