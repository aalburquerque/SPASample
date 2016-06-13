require.config({
    baseurl: 'http://localhost:8080/iml-webapp/',
    paths: {
    	'angular': '../../scripts/libs/angularjs/1.5.3/angular.min',
    	'ngAnimate' : '../../scripts/libs/angularjs/1.5.3/angular-animate.min',
        
        'ui-grid': '../../scripts/libs/angular-ui-grid/3.1.1/ui-grid.min',
        
        'oc-lazyLoad': '../../scripts/libs/ocLazyLoad/1.0.9/ocLazyLoad.core.min',
        
        'ngStorage': '../../scripts/libs/ngStorage/0.3.10/ngStorage.min',
        'ngCookies': '../../scripts/libs/angular-cookies/1.5.7/angular-cookies.min',
       
        'ui-router': '../../scripts/libs/angular-ui-router/0.2.18/angular-ui-router.min',
        'ui-bootstrap': '../../scripts/libs/bootstrap/ui-bootstrap-tpls-1.3.3.min',
        'jquery': '../../scripts/libs/jquery/1.10.2/jquery-1.10.2.min',
        'bootstrap': '../../scripts/libs/bootstrap/bootstrap.min',
        
        'IncidentSrv': '../../components/incident/incidentService',
        'IncidentCtrl': '../../components/incident/incidentController',
        
        'IncidentSearchSrv': "../../components/incidentSearch/incidentSearchService",
        'IncidentSearchCtrl': "../../components/incidentSearch/incidentSearchController",
        
        'IncidentDetailSrv': "../../components/incidentDetail/incidentDetailService",
        'IncidentDetailCtrl': "../../components/incidentDetail/incidentDetailController",
        
        'SubjectDetailSrv': "../../components/subjectDetail/subjectDetailService",
        'SubjectDetailCtrl': "../../components/subjectDetail/subjectDetailController",
        
        'ActionDetailSrv': "../../components/actionDetail/actionDetailService",
        'ActionDetailCtrl': "../../components/actionDetail/actionDetailController",
        
        'ReportDetailSrv': "../../components/reportDetail/reportDetailService",
        'ReportDetailCtrl': "../../components/reportDetail/reportDetailController"
    },
    shim: {
        ngStorage: { 
            deps: ['angular'],
            exports: 'angular'
        },
        ngCookies: {
            deps: ['angular'],
            exports: 'angular'
        },
        
        'ui-router': {
            deps: ['angular'],
            exports: 'angular'
        },
        
        'ui-bootstrap': {
            deps: ['angular'],
            exports: 'angular'
        },
        'ngAnimate': {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports: 'angular'
        },
        'oc-lazyLoad': {
            deps: ['angular']
        },
        'ui-grid': {
            deps: ['angular'],
        },
        bootstrap: {
            deps: ['jquery']
        },
        'app': {
            deps:['ui-router', 'ui-bootstrap', 'ngAnimate',  'oc-lazyLoad']
        },
        IncidentDetailDirective : ['angular']
    },
    deps: ['app']
});

require([
    "app",
    "ui-grid",
    "bootstrap",
    "IncidentSrv",
    "IncidentCtrl",
    "IncidentSearchSrv",
	"IncidentSearchCtrl",
	"IncidentDetailSrv",
	"IncidentDetailCtrl",
	"SubjectDetailSrv",
	"SubjectDetailCtrl",
	"ActionDetailSrv",
	"ActionDetailCtrl",
	"ReportDetailSrv",
	"ReportDetailCtrl"
],

    function (app) {
        //bootstrapping app
        app.init();
    }
);