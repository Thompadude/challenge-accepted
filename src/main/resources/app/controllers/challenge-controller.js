app.controller('ChallengeController', ['$scope', '$http', '$sce', 'challengeService', 'userService', function ($scope, $http, $sce, challengeService, userService) {

    $scope.orderByField = 'creationDate';
    $scope.reverseSort = true;
/*    $scope.activeChallenge = {};*/
    

    $scope.getUserInputsFromCreateChallengeForm = function () {
        return JSON.stringify({
            'topic': $('#input-topic').val(),
            'description': $('#input-description').val(),
            'creationDate': null,
            'challengeClaimed': false
        });
    };

    $scope.showCreateChallengeSection = function () {
        $scope.section = "createNewChallengeSection";
    };

    $scope.showListOfChallengesSection = function () {
        $scope.getListOfChallenges();
        $scope.section = "listOfChallengesSection";
    };

    $scope.showSecretListOfChallengesSection = function () {
        $scope.section = "secretListOfChallengesSection";
    };

    $scope.createNewChallenge = function () {
        var loggedInUser = angular.fromJson(sessionStorage.getItem("loggedInUser"));
        var userId = loggedInUser.id;
        console.log(userId)
        challengeService.createNewChallenge($scope.getUserInputsFromCreateChallengeForm(), userId)
            .success(function () {
                console.log('challengeService.createNewChallenge() called and it created a new challenge and saved it to the database!');
                $scope.getListOfChallenges()

            })
            .error(function () {
                console.log('challengeService.createNewChallenge() called and it ***FAILED*** to create new challenge');
            })
    };

    $scope.getListOfChallenges = function () {
        challengeService.getListOfChallenges()
            .success(function (response) {
                $scope.listOfChallenges = response;
                console.log('challengeService.getListOfChallenges() fetched all the challenges from the database successfully!');
            })
            .error(function () {
                console.log('challengeService.getListOfChallenges() ***FAILED*** to fetch all the challenges from the database!');
            })
    };

    $scope.upvoteChallenge = function (challenge) {
        challengeService.addUserToChallengeUpvoters(challenge).success(function () {
            console.log("Add user to upvoted challenges success");
            $scope.getListOfChallenges();
        })
    };

    $scope.isChallengeUpvotedByUser = function (challenge) {
        console.log("-----------isChallengeUpvotedByUser runs---------------");
        $scope.loggedInUser = angular.fromJson(sessionStorage.getItem("loggedInUser"));
        console.log("Logged in user: " + $scope.loggedInUser.firstName + ", ID: " + $scope.loggedInUser.id);
        console.log("Challenge topic: " + challenge.topic + ", Size in challengeUpvoters: " + challenge.challengeUpvoters.length);

        
        
        if (challenge.challengeUpvoters !== null && challenge !== null) {
            for(var i = 0; i < challenge.challengeUpvoters.length; i++) {
                console.log("Challenge upvoters ID: " + challenge.challengeUpvoters[i]);
                if (challenge.challengeUpvoters[i] === $scope.loggedInUser.id) {
                    console.log("-------------------------------------------------------");
                    return true;
                }
            }
        } else {
            return false;
        }
        console.log("-------------------------------------------------------");
    };

    $scope.claimCurrentChallenge = function (challenge) {

        $scope.loggedInUser = angular.fromJson(sessionStorage.getItem("loggedInUser"));

        challenge.challengeClaimer = $scope.loggedInUser;
        challenge.challengeClaimed = true;



        challengeService.updateChallenge(angular.toJson(challenge)).success(function () {
            console.log("claim challenge: Gick bra");
        }).error(function (data) {
            console.log("claim challenge: gick INTE bra");
            console.log(data);
        });

    };

    $scope.viewChallengeProfilePage = function (challenge) {
        $scope.section = "challengeProfilePageSection";
        $scope.activeChallenge = challenge;
        console.log("challengeProfileToView object: ");
        console.log($scope.challengeProfileToView);
        console.log(challenge.challengeClaimed);
        
        console.log("BOOLEANENNNNNNN " + $scope.isChallengeUpvotedByUser(challenge));
        
        $scope.disableLikeButton = $scope.isChallengeUpvotedByUser(challenge);
    };

    $scope.addYoutubeUrlToCurrentChallenge = function (challenge) {
        var userProvidedUrl = $('#input-youtube-url').val();
        challenge.youtubeURL = convertToYouTubeEmbedUrl(userProvidedUrl);
        challenge.youtubeVideoUploaded = true;

        challengeService.updateChallenge(angular.toJson(challenge))
            .success(function(){
                console.log("nu är youtube url sparat.");
            }).error(function(){
                console.log("nu är youtube url INTE sparat");
        });
    };


    $scope.markUrlAsTrusted = function (src) {
        return $sce.trustAsResourceUrl(src);
    };
    

    var convertToYouTubeEmbedUrl = function (url) {
        var isYoutubeUrlCorrect = url.indexOf("watch?v=") > 1;
        var baseUrl = "https://www.youtube.com/embed/";

        if (isYoutubeUrlCorrect) {
            var youTubeVideoId = url.substr(32);
            var finalUrl = baseUrl + youTubeVideoId;
        } else {
            alert("Please provide a valid YouTube URL");
            return "";
        }
        return finalUrl;
    }

    $scope.addCommentToChallenge = function (challenge) {
        var commentFromUser = $('#textarea-comment-field').val();
        
        //todo Här efter backend är klart
        
        console.log(commentFromUser);
        
    }


}]);