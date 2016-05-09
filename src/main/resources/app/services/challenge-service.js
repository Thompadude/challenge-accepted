app.factory('challengeService', function ($http) {
    return {
        getChallengeById: function (id) {
            return $http({
                url: 'http://localhost:8080/api/challenge/' + id,
                method: 'GET',
                header: {'Content-Type': 'application/json'}
            })
        },
        getListOfChallenges: function () {
            return $http({
                url: 'http://localhost:8080/api/challenges/',
                method: 'GET',
                header: {'Content-Type': 'application/json'}
            })
        },
        createNewChallenge: function (data, loggedInUserId) {
            return $http({
                url: 'http://localhost:8080/api/challenge/create/challengecreator/' + loggedInUserId,
                method: 'POST',
                data: data,
                header: {'Content-Type': 'application/json'}
            })
        },
        updateChallenge: function (data) {
            return $http({
                url: 'http://localhost:8080/api/challenge/',
                method: 'PUT',
                data: data,
                header: {'Content-Type': 'application/json'}
            })
        },

        addUserToChallengeUpvoters: function (data, id) {
            var loggedInUser = angular.fromJson(sessionStorage.getItem("loggedInUser"));
            return $http({
                url: 'http://localhost:8080/api/challenge/' + id + '/',
                method: 'PUT',
                data: data,
                header: {'Content-Type': 'application/json'}
            })
        },

        checkIfChallengeIsUpvotedByUser: function (loggedInUserId, challengeId) {
            return $http({
                url: 'http://localhost:8080/api/challenge/' + challengeId + '/checkifchallengeisupvotedbyuser/' + loggedInUserId + '/',
                method: 'GET',
                header: {'Content-Type': 'application/json'}
            })

        },

        addCommentToChallenge: function (data, challengeId) {
            return $http({
                url: 'http://localhost:8080/api/challenge/' + challengeId + '/comment/',
                method: 'POST',
                data: data,
                header: {'Content-Type': 'application/json'}
                // TODO move this to comment-service!
            })

        },

        getListOfUnapprovedChallenges: function () {
            return $http({
                url: 'http://localhost:8080/api/challenges/unapproved/',
                method: 'GET',
                header: {'Content-Type': 'application/json'}
            })
        },

        getListOfCompletedChallenges: function() {
            return $http({
                url: 'http://localhost:8080/api/challenges/completed/',
                method: 'GET',
                header: {'Content-Type': 'application/json'}
            })
        }
    }
});