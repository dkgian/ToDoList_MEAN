var app = angular.module("myApp", []);
 
 app.controller("myCtrl", function($scope, $http) {

                 
$http.get("/api/todos")
    .then(function(response){ //data GET from JSON from /api/todos
    $scope.todos = response.data;
    console.log(response.data);
    })
                    
                    
$scope.createTodo = function(){
    $http.post("/api/todos", $scope.formData)
        .then(function(response){
        $scope.formData = {}
        $scope.todos = response.data
        })
}
                
$scope.deleteTodo = function(id){
    $http.get("/api/todos/"+id)
        .then(function(response){
        $scope.todos = response.data
        })
    }
         
});