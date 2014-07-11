'use strict';

angular.module('App')
  .controller('MainCtrl', function ($scope, Regex,  $modal, $log, ngTableParams) {

    $scope.isItem = false;
    $scope.Items = [];
    $scope.newItem = {name:'',regex:'',url:''};

    $scope.Item ={name:'', regex:'', url:''};
        
    $scope.results = [];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.results.length, // length of data
        getData: function($defer, params) {
            $defer.resolve($scope.results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.deleteItem = function(){
      $scope.tabs = $scope.tabs.filter(function(val){ return val.name !== $scope.Item.name;});
      $scope.Item ={name:'', regex:''};
      $scope.isItem = false;
    }

    $scope.searchItem = function() {
        Regex.get({
          regex: $scope.Item.regex,
          url: $scope.Item.url
        },
        function(data) {          

            $scope.results = data.data;
            $scope.tableParams.total($scope.results.length) 
            $scope.tableParams.reload();
        },
        function(err) {
          console.log(err);
        });
    }

    $scope.checkItem = function(value){
     var item  = $scope.Items.filter(function(val){ return val.name == value;})[0];
      $scope.Item = item;
      $scope.isItem = true;
    }

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/newItem.html',
      controller: ModalInstanceCtrl,
      size: size     
    });

    modalInstance.result.then(function (item) {
      $scope.Items.push(item);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   
});


var ModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.item ={name:'', regex:'', url:''};

  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};