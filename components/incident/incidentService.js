define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"IncidentSrv",
							[
									'$http', '$rootScope' ,
									function($http,  $rootScope) {

										var service = {};

										var selectedIncident = {};
										var selectedSubject = {};
										var selectedAction = {};
										var selectedReport = {};

										var selectedReportType;



										service.myMasterValues = {};

										service.getSelectedIncident = function() {
											return selectedIncident;
										}
										service.setSelectedIncident = function(
												selectedIncidentParam) {
											selectedIncident = selectedIncidentParam
										};

										service.setSelectedReportType = function(selectedReportTypeParam){
											selectedReportType=selectedReportTypeParam;
										}

										service.getSelectedReportType = function() {
											return selectedReportType;
										}

										service.getSelectedSubject = function() {
											return selectedSubject;
										}
										service.setSelectedSubject = function(
												selectedSubjectParam) {
											selectedSubject = selectedSubjectParam
										};

										service.getSelectedAction = function() {
											return selectedAction;
										}
										service.setSelectedAction = function(
												selectedActionParam) {
											selectedAction = selectedActionParam
										};

										service.getSelectedReport = function() {
											return selectedReport;
										}
										service.setSelectedReport = function(
												selectedReportParam) {
											selectedReport = selectedReportParam
										};

										service.getProcedureTypeName = function(
												procedureTypeId) {
											// Sacar el texto
											var procedureTypeLabel = '';
											for (var i = 0; i < service.getMasterValues().tipoProcList.length; i++) {
												if (service.getMasterValues().tipoProcList[i]['id'] == procedureTypeId) {
													procedureTypeLabel = service.getMasterValues().tipoProcList[i]['name'];
													break;
												}
											}
											return procedureTypeLabel;
										}

										service.getJusticialBodyName = function(
												judicialBodyId) {
											// Sacar el texto
											var juditialBodyLabel = '';
											for (var i = 0; i < service.getMasterValues().orgJudList.length; i++) {
												if (service.getMasterValues().orgJudList[i]['id'] == judicialBodyId) {
													juditialBodyLabel = service.getMasterValues().orgJudList[i]['name'];
													break;
												}
											}
											return juditialBodyLabel;
										}

										service.loadMasterValues = function() {
											$http
													.get(
															'components/incident/data.json')
													.success(
															function(data) {
																service.myMasterValues = data;
															});
										}

										service.getMasterValues = function() {
											if (!service.myMasterValues){
												return [];
											}
											return service.myMasterValues;
										}

										service.loadAction = function(
												actionCode) {
											var result = {};
											if (!$rootScope.actionList) {
												$rootScope.actionList = [];
											}

											var total = $rootScope.actionList.length;

											for (var i = 0; i < total; i++) {
												if ($rootScope.actionList[i].actionCode == actionCode) {
													result = $rootScope.actionList[i];
													break;
												}
											}
											return result;

										}

										return service;
									} ]);

		});
