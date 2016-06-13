define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"IncidentSearchSrv",
							[
									'$http',
									'IncidentSrv',
									'$rootScope',
									function($http, IncidentSrv, $rootScope) {

										var service = {};

										if ($rootScope.incidentList == null
												|| $rootScope.incidentList.length === 0) {
											$rootScope.incidentList = [];
										}

										service.getTotalIncidentItems = function() {
											return $rootScope.incidentList.length;
										}

										service.getIncidentToPresent = function(
												incident) {
											var procedureTypeLabel = IncidentSrv
													.getProcedureTypeName(incident.procedureType);

											var juditialBodyLabel = IncidentSrv
													.getJusticialBodyName(incident.judicialBodyId);

											var incidentToPresent = {
												"incidentCode" : incident.incidentCode,
												"procedureType" : procedureTypeLabel,
												"juditialBody" : juditialBodyLabel,
												"procedureNumber" : incident.procedureNumber,
												"factTime" : incident.factTimeInYear,
												"operacion" : incident.incidentCode
											};
											return incidentToPresent;
										}

										service.getIncidentItems = function(
												pageNumber, pageSize,
												searchText) {

											$http
													.get(
															'../components/incident/simData.json')
													.success(
															function(data) {
																$rootScope.incidentList = data;

																$rootScope.incidentsToPresentList = [];

																for (var i = 0; i < $rootScope.incidentList.length; i++) {
																	
																		$rootScope.incidentsToPresentList
																			.push(service.getIncidentToPresent($rootScope.incidentList[i]));
																}

																// total elementos que casan con el filtro
																$rootScope.totalIncidentsToPresent=$rootScope.incidentsToPresentList.length;
																
																var firstRow = (pageNumber - 1)
																		* pageSize;

																// elementos de la pagina activa
																$rootScope.incidentsToPresentList = $rootScope.incidentsToPresentList
																		.slice(
																				firstRow,
																				firstRow
																						+ pageSize);

															});

										};

										return service;
									} ]);

		});
