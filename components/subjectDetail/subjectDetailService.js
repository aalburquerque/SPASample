define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"SubjectDetailSrv",
							[
									'$filter',
									'$rootScope',
									'IncidentSrv',
									function($filter, $rootScope, IncidentSrv) {

										var service = {};

										var genderList = IncidentSrv
												.getMasterValues().genderList;
										var educationList = IncidentSrv
												.getMasterValues().educationList;
										var ocupationList = IncidentSrv
												.getMasterValues().ocupationList;
										var maritalStatusList = IncidentSrv
												.getMasterValues().maritalStatusList;

										service.getTipoIdentificadorList = function() {
											return IncidentSrv
													.getMasterValues().tipoIdentificadorList;
										};

										service.getGenderList = function() {
											return genderList;
										};

										service.getEducationList = function() {
											return educationList;
										};

										service.getOcupationList = function() {
											return ocupationList;
										};

										service.getMaritalStatusList = function() {
											return maritalStatusList;
										};

										service.loadSubject = function(
												subjectCode) {
											if (!$rootScope.subjectList) {
												$rootScope.subjectList = [];
											}

											for (var i = 0; i < $rootScope.subjectList.length; i++) {
												if ($rootScope.subjectList[i]['subjectCode'] == subjectCode) {
													return $rootScope.subjectList[i];
												}
											}
											return {};
										}

										service.saveOrUpdateSubject = function(
												subject) {

											if (!subject) {
												return;
											}
											// inicializar
											if (!$rootScope.subjectList) {
												$rootScope.subjectList = [];
											}

											if (!subject.subjectCode
													|| subject.subjectCode == '') {

												// nuevo codigo de sujeto
												var rndValue = Math.floor((Math
														.random() * 100) + 1);
												subject.subjectCode = "SU20000"
														+ rndValue;

												// añadir a la lista
												$rootScope.subjectList
														.push(subject);

											} else {

												// localizamos en la lista y
												// actualizamos
												for (var i = 0; i < $rootScope.subjectList.length; i++) {
													if (subject.subjectCode == $rootScope.subjectList[i]['subjectCode']) {
														$rootScope.subjectList[i] = subject;
														break;
													}
												}

											}

										};

										return service;
									} ]);

		});
