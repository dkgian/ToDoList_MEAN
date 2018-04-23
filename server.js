//--setup--
var express         = require("express"),
    app             = express(),
    morgan          = require("morgan"), //log req to Console
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    
    Todo            = require("./models/todo"),
    seedDB          = require("./seeder")
    
//--Config --
mongoose.connect("mongodb://localhost/todolist",{useMongoClient: true});
app.use(express.static(__dirname+'/public')); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

//--seed some test data
seedDB();

//--ROUTE--

//find() -> return JSON
app.get("/api/todos", function(req, res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err)
        }else{
            res.json(todos);
        }
    })
});

//create new task
app.post("/api/todos", function(req, res){
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo){
        if(err){
            console.log(err)
        }else{
            Todo.find(function(err, todos){
                if(err){
                    console.log(err)
                }else{
                    res.json(todos)
                }
            });
        }
    });
});


//delete task
app.get("/api/todos/:todoId", function(req, res){
    Todo.remove({
        _id : req.params.todoId
    }, function(err, todo){
        if(err){
            console.log(err)
        }else{
            Todo.find(function(err, todos){
                if(err){
                    console.log(err)
                }else{
                    res.json(todos)
                }
            });
        }
    })
})

// -app-
app.get("*", function(req, res){
    res.sendfile("./public/index.html");
})

//--Start Server--
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================="); 
    console.log("SERVER starts listening..."); 
    console.log("=========================="); 
});

