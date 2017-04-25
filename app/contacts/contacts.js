'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl'
    });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    //init firebase
    var ref = new Firebase('https://resplendent-heat-7372.firebaseio.com/contacts');

    //get contacts
    $scope.contacts = $firebaseArray(ref);

    //Show add form
    $scope.showAddForm = function() {
        $scope.addFormShow = true;
    }

    $scope.showEditForm = function(contact) {
        $scope.editFormShow = true;

        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.home_phone = contact.phones[0].home;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.street_address = contact.address[0].street_address;
        $scope.city = contact.address[0].city;
        $scope.state = contact.address[0].state;
        $scope.zip_code = contact.address[0].zip_code;
    }

    $scope.hide = function() {
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }

    //submit
    $scope.addFormSubmit = function() {
        console.log("Adding...");

        if ($scope.name) {
            var name = $scope.name;
        } else {
            var name = null;
        }
        if ($scope.email) {
            var email = $scope.email;
        } else {
            var email = null;
        }
        if ($scope.company) {
            var company = $scope.company;
        } else {
            var company = null;
        }
        if ($scope.mobile_phone) {
            var mobile_phone = $scope.mobile_phone;
        } else {
            var mobile_phone = null;
        }
        if ($scope.home_phone) {
            var home_phone = $scope.home_phone;
        } else {
            var home_phone = null;
        }
        if ($scope.work_phone) {
            var work_phone = $scope.work_phone;
        } else {
            var work_phone = null;
        }
        if ($scope.street_address) {
            var street_address = $scope.street_address;
        } else {
            var street_address = null;
        }
        if ($scope.city) {
            var city = $scope.city;
        } else {
            var city = null;
        }
        if ($scope.state) {
            var state = $scope.state;
        } else {
            var state = null;
        }
        if ($scope.zip_code) {
            var zip_code = $scope.zip_code;
        } else {
            var zip_code = null;
        }

        $scope.contacts.$add({
            name: name,
            email: email,
            company: company,
            phones: [{
                mobile: mobile_phone,
                home: home_phone,
                work: work_phone
            }],
            address: [{
                street_address: street_address,
                city: city,
                state: state,
                zip_code: zip_code
            }]
        }).then(function(ref) {
            var id = ref.key();
            console.log(id);

            //Clear form
            clearFields();

            $scope.addFormShow = false;

            //Send messages
            $scope.msg = "contact added";
        });
    }

    $scope.editFormSubmit = function() {

        var id = $scope.id;

        var record = $scope.contacts.$getRecord(id);

        if ($scope.name) {
            record.name = $scope.name;
        } else {
            record.name = null;
        }
        if ($scope.email) {
            record.email = $scope.email;
        } else {
            record.email = null;
        }
        if ($scope.company) {
            record.company = $scope.company;
        } else {
            record.company = null;
        }
        if ($scope.mobile_phone) {
            record.mobile_phone = $scope.mobile_phone;
        } else {
            record.mobile_phone = null;
        }
        if ($scope.home_phone) {
            record.home_phone = $scope.home_phone;
        } else {
            record.home_phone = null;
        }
        if ($scope.work_phone) {
            record.work_phone = $scope.work_phone;
        } else {
            record.work_phone = null;
        }
        if ($scope.street_address) {
            record.street_address = $scope.street_address;
        } else {
            record.street_address = null;
        }
        if ($scope.city) {
            record.city = $scope.city;
        } else {
            record.city = null;
        }
        if ($scope.state) {
            record.state = $scope.state;
        } else {
            record.state = null;
        }
        if ($scope.zip_code) {
            record.zip_code = $scope.zip_code;
        } else {
            record.zip_code = null;
        }

        $scope.contacts.$save(record);

        clearFields();

        $scope.editFormShow = false;

        $scope.msg = "Contact updated";
    }

    $scope.showContact = function(contact) {
        console.log("...");
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;

        if (contact.phones) {
            $scope.work_phone = contact.phones[0].work;
            $scope.home_phone = contact.phones[0].home;
            $scope.mobile_phone = contact.phones[0].mobile;
        }
        else {
            $scope.work_phone = null;
            $scope.home_phone = null;
            $scope.mobile_phone = null;
        }

        if (contact.address) {
            $scope.street_address = contact.address[0].street_address;
            $scope.city = contact.address[0].city;
            $scope.state = contact.address[0].state;
            $scope.zip_code = contact.address[0].zip_code;
        }
        else {
            $scope.street_address = null;
            $scope.city = null;
            $scope.state = null;
            $scope.zip_code = null;
        }

        $scope.contactShow = true;
    }

    $scope.removeContact = function(contact) {
        $scope.contacts.$remove(contact);
        $scope.msg = "Contact removed";
    }

    function clearFields() {
        $scope.name = '';
        $scope.email = '';
        $scope.company = '';
        $scope.mobile_phone = '';
        $scope.home_phone = '';
        $scope.work_phone = '';
        $scope.state = '';
        $scope.street_address = '';
        $scope.city = '';
        $scope.zip_code = '';
    }

}]);