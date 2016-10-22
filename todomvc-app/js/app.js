/**
 * Created by lide on 2016/10/21.
 */
(function (angular) {
	'use strict';
	var app = angular.module("myApp",[]);
	app.controller("myController",['$scope','$location',function($scope,$location){
		//生成ID
		function getId() {
			var id = Math.random(); // 1 2
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					//*****迭代函数*****
					id = getId();
					break;
				}
			}
			return id;
		}
		//定义传递数据todos
		$scope.todos =[];
		//全选按键函数
		var now = true;
		$scope.toggleAll = function(){
			for(var i = 0 ;i <$scope.todos.length ; i++ ){
				$scope.todos[i].completed = now ;
			}
			now = !now ;
		}
		//输入
		$scope.text = '';
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				id:getId(),
				text:$scope.text,
				completed:false
			})
			$scope.text = '';
		}
		//删除
		$scope.remove = function(id){
			for(var i = 0 ;i <$scope.todos.length ; i++ ){
				if($scope.todos[i].id === id){
					$scope.todos.splice( i , 1);
					break;
				}
			}
		}
		//编辑
		$scope.currentEditId = -1;
		$scope.editing = function (id) {
			$scope.currentEditId = id;
		}
		//编辑完成
		$scope.save = function () {
			$scope.currentEditId = -1;
		}
		//删除已完成
		$scope.clearCompleted = function(){
			var result = [];
			for(var i = 0 ;i <$scope.todos.length ; i++ ){
				if(!$scope.todos[i].completed){//新建数组result为空，当completed = false时push
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result; //使$scope.todos 等于新的数组 result;
		}
		//是否有已完成
		$scope.show = function(){
			for(var i = 0 ;i <$scope.todos.length ; i++ ){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}
		//状态筛选，新建空的状态筛选对象selector
		$scope.selector = {};
		//暴露$location
		$scope.$location = $location;
		//获取地址$location.path()
		$scope.$watch("$location.path()", function (now,old) {
			switch (now){
				case '/active':
					//通过判断地址，给selector赋值
					$scope.selector = {completed:false};
					break;
				case '/completed':
					$scope.selector = {completed:true};
					break;
				default:
					//通过判断地址，给selector赋值
					$scope.selector = {};
					break;
			}
		})
		//自定义完全匹配函数
		// 加在筛选器的第二个选项中 | filter:selector:equalCompare
		$scope.equalCompare = function (source,target) {
			return source == target ;
		}
		}])
})(angular);

