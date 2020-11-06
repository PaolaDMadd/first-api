const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Console } = require('console');

let server = express();
server.use(cors());
server.use(bodyParser.json());


//menu data
const foods = [
    {id : 1, name : "Sandwich", size : "small", price : 3},
    {id : 2, name : "Pasta", size : "small", price : 5},
    {id : 3, name : "MeatBall", size : "medium", price : 8},
    {id : 4, name : "ChocolateCake", size : "large", price : 15}
];

//Root route
server.get('/', (req, res)=>{
    res.send('Hello client, Check menu with /foods');
});

server.get('/foods', (req, res)=>{
    res.send(foods);
});


// server.post('/foods', (req, res)=>{
//     const foodData = req.body;
//     const newFood = {id : foods.length + 1, ...foodData};
//     foods.push(newFood);
//     res.status(201).send(newFood);
// })

server.post('/foods', (req, res)=>{
    const foodData = req.body;
    const newFood = {id : foods.length + 1, ...foodData};
    let foodMap = foods.map(food => ({
        name : food.name,
        size : food.size,
        price : food.price
    }));

    let index = foodMap.findIndex(f => {
        return Object.keys(f).every(key => {
            return f[key] === foodData[key]
        })
    });

    if(index < 0){
        foods.push(newFood);
        res.status(201).send(newFood)
    }else{
        res.status(400).send('Food alread exists in the menu')
    }
})

module.exports = server;