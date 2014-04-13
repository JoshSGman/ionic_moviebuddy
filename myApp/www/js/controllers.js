var app = angular.module('starter.controllers', []);

app.controller('LoginController', function($scope) {
});

app.controller('DashController', function($scope) {
});

app.controller('OutingsController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  $scope.outingButtons = [
     {
       text: 'Edit',
       type: 'Button',
       onTap: function(item) {
         alert('Edit Item: ' + item.id);
       }
     },
     {
       text: 'Delete',
       type: 'Button',
       onTap: function(item) {
         alert('Delete Item: ' + item.id);
       }
     }
  ];
  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  // Rewrite using angular.forEach()?
  var clearOutingForm = function() {
    $scope.form.movie = '';
    $scope.form.date = '';
    $scope.form.theater = '';
    // $scope.form.invitees = '';
  };

  // Function to create new 'outing' object from form and user.
  var createOuting = function(form, userId, userName) {
    if(form === undefined || userId === undefined || userName === undefined) {
      throw new Error('Insufficient input for function.');
    }
    var outing = {};
    outing.movie = form.movie;
    outing.date = form.date;
    outing.theater = form.theater;
    // Look up below values via TMS or Fandango API or app DB.
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    // Postpone invitation funcationality for post-MVP.
    // outing.invitees = form.invitees;
    outing.attendees = {};
    outing.attendees[userId] = { name: userName };
    outing.attendees[1001] = { name: 'Alice' };
    outing.attendees[1002] = { name: 'Bob' };
    outing.creator = userId;
    return outing;
  };

  // Define empty object to hold form data.
  $scope.form = {};

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  // Function to hide 'new outing' button & show 'new outing' form.
  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  // Function to hide 'new outing' form & show 'new outing' button.
  $scope.cancelNewOuting = function() {
    newOutingFormVisible = false;
    newOutingButtonVisible = true;
  };

  // Function to process 'new outing' form.
  $scope.processOutingForm = function() {
    var form = $scope.form;
    var userId = $rootScope.user.facebookId;
    var userName = $rootScope.user.name;
    var outing = createOuting(form, userId, userName);
    $http({
      method: 'POST',
      url: '/api/outings',
      data: outing
    })
    .success(function(data) {
      console.log('POST Success:', data);
      clearOutingForm();
      // Hide 'new outing' form, show 'new outing' button.
      newOutingFormVisible = false;
      newOutingButtonVisible = true;
      // Refresh the 'outings' display.
      $scope.getOutings();
    })
    .error(function(data, status, headers, config) {
      console.log('POST Error:', data, status, headers, config);
    });
  };

  // Function to pull all 'outings' from DB for user.
  $scope.getOutings = function() {
    $http({
      method: 'GET',
      url: '/api/outings'
    })
    .success(function(data) {
      console.log('GET Success:', data);
      $scope.outings = data;
      $rootScope.outings = data;
    })
    .error(function(data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };

  $scope.showJoinButton = function() {
    var userId = $rootScope.user.facebookId;
    for(var attendeeId in this.outing.attendees) {
      if(Number(attendeeId) === Number(userId)) {
        return false;
      }
    }
    return true;
  };

  $scope.joinOuting = function() {

    var userId = $rootScope.user.facebookId;
    var userName = $rootScope.user.name;
    var outing = this.outing;
    var outingId = this.outing._id;
    if(outing.attendees[userId]) {
      throw new Error('User is already attending.');
    }
    outing.attendees[userId] = { name: userName };

    $http({
      method: 'PUT',
      url: '/api/outings/' + outingId,
      data: outing
    })
    .success(function(data) {
      console.log('PUT Success:', data);
      $scope.getOutings();
    })
    .error(function(data, status, headers, config) {
      console.log('PUT Error:', data, status, headers, config);
    });

  };

  // Initialize display of outings.
  $scope.getOutings();

}]);

app.controller('MoviesController', function ($scope, $http, getMoviesData) {

  var queryPage = 1;
  var queryPageLimit = 50;

  // $scope.allMovies = $rootScope.allMovies;


  // var getMovies = function(queryPage, queryPageLimit) {
  //   getMoviesData.getMovieData(queryPage, queryPageLimit)
  //   .then(function(){
  //     $scope.allMovies = getMoviesData.allMovies;
  //   });
  // };

  // getMovies(queryPage, queryPageLimit);
  $scope.itemButtons = [
     {
       text: 'Edit',
       type: 'Button',
       onTap: function(item) {
         alert('Edit Item: ' + item.id);
       }
     },
     {
       text: 'Share',
       type: 'Button',
       onTap: function(item) {
         alert('Share Item: ' + item.id);
       }
     }
  ];
});


app.controller('SynopsisController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    if (!text) { text = ' '; }
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...'? $scope.moreText = '' : $scope.moreText = '...';
  };
});

app.controller('CriticsController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    if (!text) { text = ' '; }
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...' ? $scope.moreText = '' : $scope.moreText = '...';
  };
});


app.controller('ProfileController', function($scope) {
});
