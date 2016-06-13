define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"IncidentDetailSrv",
							[
									'$filter',
									'$rootScope',
									'IncidentSrv',
									function($filter, $rootScope, IncidentSrv) {

										var service = {};

										var imlList = IncidentSrv
												.getMasterValues().imlList;
										var tipoOrganismoJudicialList = IncidentSrv
												.getMasterValues().tipoOrganismoJudicialList;
										var orgJudList = IncidentSrv
												.getMasterValues().orgJudList;
										var tipoProcList = IncidentSrv
												.getMasterValues().tipoProcList;

										service.getIdentificationTypeName = function(
												identificationTypeParam) {

											var name = '';
											for (var i = 0; i < IncidentSrv
													.getMasterValues().tipoIdentificadorList.length; i++) {
												if (identificationTypeParam == IncidentSrv
														.getMasterValues().tipoIdentificadorList[i]['id']) {
													name = IncidentSrv
															.getMasterValues().tipoIdentificadorList[i]['name']
													break;
												}
											}
											return name;
										}

										service.getExpertName = function(
												expertId) {

											var name = '';
											for (var i = 0; i < IncidentSrv
													.getMasterValues().expertList.length; i++) {
												if (expertId == IncidentSrv
														.getMasterValues().expertList[i]['id']) {
													name = IncidentSrv
															.getMasterValues().expertList[i]['name']
													break;
												}
											}
											return name;
										}

										service.getActuationTypeNames = function(
												assistanceIds) {

											if (!assistanceIds) {
												return '';
											}
											var name = '';
											for (var i = 0; i < IncidentSrv
													.getMasterValues().assistanceList.length; i++) {
												for (var j = 0; j < assistanceIds.length; j++) {
													if (assistanceIds[j] == IncidentSrv
															.getMasterValues().assistanceList[i]['id']) {
														name += IncidentSrv
																.getMasterValues().assistanceList[i]['name']
																+ ' ';
													}
												}
											}
											return name;
										}

										service.getSubjectsActions = function() {
											$rootScope.subjectsActionsList = [];

											if (!$rootScope.subjectList) {
												$rootScope.subjectList = [];
											}

											if (!$rootScope.actionList) {
												$rootScope.actionList = [];
											}

											for (var i = 0; i < $rootScope.subjectList.length; i++) {

												var subject = $rootScope.subjectList[i];

												subject.identificationTypeName = service
														.getIdentificationTypeName(subject.identificationType);

												var nuevoAccionSujeto_Sujeto = {
													codigo : subject.subjectCode,
													tipo : subject.identificationTypeName,
													identificador : subject.identificationNumber,
													nombre : subject.firstName
															+ ' '
															+ subject.lastName,
													perito : '',
													interconsulta : '',
													estado : '',
													operacion : '#subjectDetail',
													operacionAdd : '#actionDetail',
													$$treeLevel : 0
												};

												$rootScope.subjectsActionsList
														.push(nuevoAccionSujeto_Sujeto);

												for (var j = 0; j < $rootScope.actionList.length; j++) {
													var action = $rootScope.actionList[j];

													if (action.subjectCode == subject.subjectCode) {

														var expertName = service
																.getExpertName(action.expertId);

														var nuevoAccionSujeto_Accion = {
															codigo : action.actionCode,
															tipo : service
																	.getActuationTypeNames(action.assistanceId),
															identificador : '',
															nombre : '',
															perito : expertName,
															interconsulta : action.isOnCall,
															estado : action.stateName,
															operacion : '#actionDetail',
															operacionAdd : '',
															$$treeLevel : 1
														};

														if (!$rootScope.subjectsActionsList) {
															$rootScope.subjectsActionsList = [];
														}

														$rootScope.subjectsActionsList
																.push(nuevoAccionSujeto_Accion);
													}
												}
											}

											return $rootScope.subjectsActionsList;
										}

										service.getImlItems = function() {
											return imlList;
										};

										service.getTipoProcList = function() {
											return tipoProcList;
										};

										service.getTipoOrgJudicialesItems = function(
												paramIdIml) {
											var items = ($filter('filter')(
													tipoOrganismoJudicialList,
													{
														"refId" : paramIdIml
													}));
											return items;
										};

										service.getOrgJudicialItems = function(
												paramTipoOrgJudId) {
											var items = ($filter('filter')
													(
															orgJudList,
															{
																"refId" : paramTipoOrgJudId
															}));
											return items;
										};

										service.loadIncident = function(
												incidentCode) {

											if (!$rootScope.incidentList) {
												$rootScope.incidentList = [];
											}

											for (var i = 0; i < $rootScope.incidentList.length; i++) {
												if ($rootScope.incidentList[i]['incidentCode'] == incidentCode) {
													return $rootScope.incidentList[i];
												}
											}
											return {};
										}

										service.saveOrUpdateIncident = function(
												incident) {

											if (!$rootScope.incidentList) {
												$rootScope.incidentList = [];
											}

											if (!incident.incidentCode
													|| incident.incidentCode == '') {

												var rndValue = Math.floor((Math
														.random() * 100) + 1);

												incident.incidentCode = "IC20000"
														+ rndValue;

												incident.idIml=undefined;
												incident.idTipoorgjudicial=undefined;

												// añadir a la lista
												$rootScope.incidentList
														.push(incident);

												return incident;
											} else {
												// localizamos en la lista y
												// actualizamos
												for (var i = 0; i < $rootScope.incidentList.length; i++) {
													if (incident.incidentCode == $rootScope.incidentList[i]['incidentCode']) {
														$rootScope.incidentList[i] = incident;
														return incident;
													}
												}
											}

										};

										return service;
									} ]);

		});
