var ticketBookingApp = angular.module("ticketBookingApp", []);
    
ticketBookingApp.controller("mainController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    /*Variable initialization*/
    $scope.users = [];
    $scope.userName = "";
    $scope.totalSeatsBooked = 0;
    $scope.noOfSeats = 0;
    $scope.usersession = false;
    $scope.seatsChoosen = [];
    $scope.rowSeries = ["A","B","C","D","E","F","G","H","I","J"];
    /*Master data object to hold the widget data*/
    $scope.seatsWidgetObj = [
        { 0: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 1: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 2: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 3: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 4: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 5: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 6: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 7: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 8: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] },
        { 9: [{ selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }, { selected: false, booked : false }] }
    ];
    /*Function handler to handle the start selection button click*/
    $scope.startSelecting = function () {
        if ($scope.userName !== "" && $scope.noOfSeats > 0) {
            /*Check if the seats are available*/
            if ($scope.noOfSeats > (120 - $scope.totalSeatsBooked)) { window.alert("Entered number of seats not available! "); return; }
            $scope.usersession = true;
        }
    }
    /*Function handler to handle the seat widget click event*/
    $scope.selectThis = function (index, column) {
        /*Check if user has entered details*/
        if ($scope.usersession) {
            if (!$scope.seatsWidgetObj[index][index][column].booked) { /*Check if seat is already booked*/
                if ($scope.seatsWidgetObj[index][index][column].selected) { /*deselect an already selected seat*/
                    $scope.seatsWidgetObj[index][index][column].selected = false;
                    for (var i = 0; i < $scope.seatsChoosen.length; i++) {
                        if ($scope.seatsChoosen[i].row == index && $scope.seatsChoosen[i].col == column)
                            $scope.seatsChoosen.splice(i, 1);
                    }
                }
                else {/*select an empty seat*/
                    $scope.seatsWidgetObj[index][index][column].selected = true;
                    $scope.seatsChoosen.push({ row: index, col: column });
                }                                        
            }
        }
        else {
            window.alert("Please enter your details before selecting seats !")
        }
    }
    /**Function handler to handle the confirm the seat selection event*/
    $scope.confirmSelection = function () {
        if ($scope.usersession) { /*User detail check*/
            if ($scope.seatsChoosen.length == $scope.noOfSeats) { /*Check for the exact number of seats which was entered during registration*/
                var seatsStr = "";
                for (var j = 0, len = $scope.seatsChoosen.length; j < len; j++) {
                    var thisRow = $scope.seatsChoosen[j].row;
                    var thisCol = $scope.seatsChoosen[j].col;
                    $scope.seatsWidgetObj[thisRow][thisRow][thisCol].booked = true; /*Mark the seat as booked*/
                    seatsStr += $scope.rowSeries[thisRow]; /*Build the seat number string*/
                    seatsStr += (thisCol + 1) + ", ";
                    if (j == len - 1) {
                        seatsStr = seatsStr.slice(0, -2); /*remove last comma*/
                    }
                }
                $scope.users.push({ name: $scope.userName, seatsRequired: $scope.noOfSeats, bookedseats: seatsStr })
                $scope.totalSeatsBooked += $scope.noOfSeats; /*Update the booked seat count*/
                /*Clear the session specific data*/
                $scope.usersession = false;
                $scope.seatsChoosen = [];
                $scope.userName = "";
                $scope.noOfSeats = 0;
            
            }
            else {
                window.alert("Please select entered number of seats before proceeding")
            }
        }
        else {
            window.alert("Please enter your details before procceding !");
        }
    }
}]);