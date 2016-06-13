define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"ActionDetailSrv",
							[
									'$filter',
									'$rootScope',
									'$http',
									'IncidentSrv',
									function($filter, $rootScope, $http, IncidentSrv) {

										var service = {};
										
										var roleList = IncidentSrv
												.getMasterValues().roleList;
										var expertList = IncidentSrv
												.getMasterValues().expertList;
										var implicationList = IncidentSrv
												.getMasterValues().implicationList;
										var assistanceList = IncidentSrv
												.getMasterValues().assistanceList;
										var actionStatusList = IncidentSrv
												.getMasterValues().actionStatusList;

										var reportTypeList = IncidentSrv
											.getMasterValues().reportTypeList ;
										
										service.getRoleItems = function() {
											return roleList;
										};

										service.getImplicationList = function() {
											return implicationList;
										};

										service.getAssistanceList = function() {
											return assistanceList;
										};

										service.getActionStatusList = function() {
											return actionStatusList;
										};
										
										service.getReportTypeList = function() {
											return reportTypeList;
										}
										

										service.getReportTypeItems = function() {
											return service.reportTypeList;
										}

										service.getActionReports = function(
												actionCode) {
											if (!actionCode
													|| !$rootScope.reportList) {
												return [];
											}

											$rootScope.actionReportList = [];

											var reportListLength = $rootScope.reportList.length;
											for (var i = 0; i < reportListLength; i++) {
												if ($rootScope.reportList[i].actionCode == actionCode) {

													var nuevoActionReport = {
														codigo : $rootScope.reportList[i].reportCode,
														version : '',
														creador : '',
														fechaVersion : '',
														estadoEnvio : '',
														operacion : '#reportDetail',
														$$treeLevel : 0
													};

													$rootScope.actionReportList
															.push(nuevoActionReport);

													var taskListLength = $rootScope.reportList[i].taskList.length;
													for (var j = 0; j < taskListLength; j++) {

														var nuevoActionReportChild = {
															codigo : '',
															version : '0',
															creador : $rootScope.reportList[i].taskList[j].creador,
															fechaVersion : $rootScope.reportList[i].taskList[j].fechaVersion,
															estadoEnvio : $rootScope.reportList[i].taskList[j].estadoEnvio,
															operacion : '#reportDetail',
															$$treeLevel : 1
														};

														$rootScope.actionReportList
																.push(nuevoActionReportChild);
													}

												}
											}

											return $rootScope.actionReportList;
										}

										service.getExpertItems = function(
												idRole) {
											var items = ($filter('filter')(
													expertList, {
														"refId" : idRole
													}));
											return items;
										};

										service.saveAction = function(action) {

											if (!action) {
												return;
											}

											if (!$rootScope.actionList) {
												$rootScope.actionList = [];
											}

											if (!action.actionCode
													|| action.actionCode == '') {
												var rndValue = Math.floor((Math
														.random() * 100) + 1);

												// se actualiza la lista de
												// actuaciones

												action.actionCode = "AC20000"
														+ rndValue;

												$rootScope.actionList
														.push(action);
											} else {
												// localizamos en la lista y
												// actualizamos
												for (var i = 0; i < $rootScope.actionList.length; i++) {
													if (action.actionCode == $rootScope.actionList[i]['actionCode']) {
														$rootScope.actionList[i] = action;
														break;
													}
												}
											}

										};

										return service;
									} ]);

		});
