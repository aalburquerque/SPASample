define(['ui-router', 'ngStorage', 'ngCookies'], function () {

    //defining angularjs module
    var app = angular.module("app", ['ui.router', 'ngCookies', 'ngStorage', 'ngAnimate', 'ui.router' , 'ui.bootstrap',  'ui.grid', 'ui.grid.treeView', 'ui.grid.selection', 'angular-growl', 'ui.grid.pagination' ,'oc.lazyLoad']);

    //global service
    app.constant("utility",
        {
            baseAddress: "http://localhost:5100/api/"
        });

    //manual bootstrap
    app.init = function () {
        angular.bootstrap(document, ['app']);
    };

    //defining routes
    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/incidentSearch");

        $stateProvider

		.state("incidentSearch", {
                url: "/incidentSearch",
                templateUrl: 'components/incidentSearch/incidentSearchView.html',
                controller: 'IncidentSearchCtrl'
            })
		.state("incidentDetail", {
                url: "/incidentDetail",
                templateUrl: 'components/incidentDetail/incidentDetailView.html',
                controller: 'IncidentDetailCtrl'
            })
        .state("subjectDetail", {
                url: "/subjectDetail",
                templateUrl: 'components/subjectDetail/subjectDetailView.html',
                controller: 'SubjectDetailCtrl'
            })
        .state("actionDetail", {
                url: "/actionDetail",
                templateUrl: 'components/actionDetail/actionDetailView.html',
                controller: 'ActionDetailCtrl'
            })
        .state("reportDetail", {
                url: "/reportDetail",
                templateUrl: 'components/reportDetail/reportDetailView.html',
                controller: 'ReportDetailCtrl'
            })
		;
    });


    return app;
});
