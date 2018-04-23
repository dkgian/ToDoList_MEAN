var mongoose = require("mongoose");
var Todo    =require("./models/todo")

var data = [
        {
            text: "task 1 ",
        },
        {
            text: "task 2",
        },
        {
            text: "task 3",
        },
        {
            text: "task 4",
        }
    ];

function seedDB(){
    Todo.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log("DB cleaned")
            data.forEach(function(seed){
                Todo.create(seed, function(err){
                    if(err){
                        console.log(err)
                    }
                })
            })
            console.log("new tasks added")
        }
    })
}

module.exports = seedDB;