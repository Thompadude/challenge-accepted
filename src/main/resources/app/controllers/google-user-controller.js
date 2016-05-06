app.controller('GoogleUserController', ['$scope','userService', '$window', function($scope, userService, $window){
    
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        //var idToken = googleUser.getAuthResponse().id_token;
        //console.log("id token här " + idToken);
        console.log("-----------GOOGLE INFO------------------");
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log("-----------END GOOGLE INFO--------------");

        userService.createNewUser($scope.getUserInfo(profile)).success(function (response) {
            console.log('userService created a new user and saved it to database!');
            var stringifiedLoggedInUser = angular.toJson(response);
            $scope.loggedInUser = sessionStorage.setItem("loggedInUser", stringifiedLoggedInUser);
            sessionStorage.setItem("isLoggedIn", true);
            console.log("NU ÄR BOOLEANEN I LOGIN: " + sessionStorage.getItem("isLoggedIn"));
            console.log("Logged in user Stringified: " + stringifiedLoggedInUser);
            console.log("Response from createNewUser: " + response);
        }).error(function (response) {
            console.log("ERROR on createNewUser!");
            console.log(response);
        });

    }

    $scope.getUserInfo = function(profile){
        return JSON.stringify({
            'firstName': profile.getGivenName(),
            'lastName': profile.getFamilyName(),
            'email': profile.getEmail()
        });
    }

    window.onSignIn = onSignIn;

    $scope.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            sessionStorage.removeItem("loggedInUser");
            $scope.loggedInUser = sessionStorage.setItem("isLoggedIn", false);
            console.log("NU ÄR BOOLEANEN I LOGOUT: " + sessionStorage.getItem("isLoggedIn"));
            console.log('User signed out.');
            console.log(auth2.isSignedIn.get());
            $window.location.reload();
        });
    }


}]);