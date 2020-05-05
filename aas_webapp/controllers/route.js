app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/descriptions", {
            templateUrl: "/templates/elementListTemplate.html",
            controller: "elementListCtrl"
        })
        .when("/descriptions/:name", {
            templateUrl: "/templates/elementTemplate.html",
            controller: "elementCtrl"
        })
        .when("/submodels", {
            templateUrl: "/templates/elementListTemplate.html",
            controller: "elementListCtrl"
        })
        .when("/submodels/:name", {
            templateUrl: "/templates/elementTemplate.html",
            controller: "elementCtrl"
        })
        .when("/assets", {
            templateUrl: "/templates/elementListTemplate.html",
            controller: "elementListCtrl"
        })
        .when("/assets/:name", {
            templateUrl: "/templates/elementTemplate.html",
            controller: "elementCtrl"
        })
        .when("/aas", {
            templateUrl: "/templates/elementListTemplate.html",
            controller: "elementListCtrl"
        })
        .when("/aas/:name", {
            templateUrl: "/templates/elementTemplate.html",
            controller: "elementCtrl"
        })
        .when("/dataspecs", {
            templateUrl: "/templates/elementListTemplate.html",
            controller: "elementListCtrl"
        })
        .when("/dataspecs/:name", {
            templateUrl: "/templates/elementTemplate.html",
            controller: "elementCtrl"
        })
        .when("/resources", {
            templateUrl: "/templates/resourcesTemplate.html",
            controller: "rscCtrl"
        })
        .when("/configurations", {
            templateUrl: "/templates/configurationListTemplate.html",
            controller: "configListCtrl"
        })
        .when("/configurations/create", {
            templateUrl: "/templates/configurationCreateTemplate.html",
            controller: "configCreationCtrl"
        })
        .when("/configurations/:name", {
            templateUrl: "/templates/configurationTemplate.html",
            controller: "configCtrl"
        })
        .when("/index.html", {
            templateUrl: "/templates/homeTemplate.html",
            controller: "mainCtrl"
        })
        .otherwise({redirectTo: "index.html"});
        $locationProvider.hashPrefix('coreaas'); 
});