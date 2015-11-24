var app = angular.module('myApp', []);

app.controller('myCtrl', ['$scope', function($scope) {
    $scope.products = products; 
}]);

app.service('eventService', function(){

	function toggle(height, opacity, element){
		var hiddenContent = element[0].childNodes[5];
		angular.element(hiddenContent).slideToggle( "fast" );
		var paddingScreen = element[0].childNodes[1];
		angular.element(paddingScreen).animate({
			height: height,
			opacity: opacity
		}, 200, function() {});
	}

	return {
		show : function(element){
			toggle("110px", 1, element);
		},
		hide : function(element){
			toggle("190px", 0, element);
		}
	};
});

app.directive('name', function(){
	return function(scope, element, attrs){
		element.html(scope.x.name);
	}
})

.directive('price', function(){
	return function(scope, element, attrs){
		element.html("£"+scope.x.price);
	}
})

.directive('description', function(){
	return function(scope, element, attrs){
		element.html(scope.x.description);
	}
})

.directive('sizes', function(){
	return function(scope, element, attrs){
		var sizesString = "";
		var len = scope.x.sizes.length;
		for(var i = 0; i < len; i++){
			sizesString += scope.x.sizes[i];
			if(i != (len-1)){
				sizesString += ",";
			}
		}
		element.html(sizesString);
	}
})

.directive('productContainer', ['eventService', function(eventService){
	return function(scope, element, attrs){

		var backgrounds = 'url(images/jpg/'+ scope.x.image +')';

		if(scope.x.sale){
			backgrounds = 'url(images/sale.png), ' + backgrounds;
		}

		element.on('mouseenter', function(){
			eventService.show(element);
		})
		.on('mouseleave', function(){
			eventService.hide(element);
		})
        .css({
            'background-image': backgrounds
        });
	}
}]);