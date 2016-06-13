define([ 'app' ], function(app) {
	app.controller('IncidentCtrl', [ '$scope', 'IncidentSrv',
			function($scope, IncidentSrv) {

				init();
		
				function init() {
					IncidentSrv.loadMasterValues();
				}

			} ]);

});

