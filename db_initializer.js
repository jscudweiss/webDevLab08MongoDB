const mongoose = require('mongoose');
const {parse} = require("csv-parse");


const fs = require('fs');

// console.log(jsonList);


mongoose.connect('mongodb://localhost:27017/carDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const carSchema = {
    stock_num: String,
    make: String,
    model: String,
    year: String,
    color: String,
    url: String,
    price: String
}

const Car = mongoose.model('Car', carSchema);

const csvList = [];

fs.createReadStream('/data100.csv')
    .pipe(parse({
        columns: true,
        skip_empty_lines: true
    }))
    .on('data', function (csvrow) {
        // console.log(csvrow);
        csvList.push(csvrow);
    })
    .on('end', function () {
        Car.insertMany(csvList,{},(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("all data saved");
                mongoose.connection.close();
            }
        });
        console.log(csvList);
    });

