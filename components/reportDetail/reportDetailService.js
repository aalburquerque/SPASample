define(
		[ 'app' ],
		function(app) {
			app
					.factory(
							"ReportDetailSrv",
							[
									'$filter',
									'$rootScope',
									'$http',
									'IncidentSrv',
									function($filter, $rootScope, $http,
											IncidentSrv) {

										var service = {};

										service.loadReport = function(
												selectedReport) {
											return {};
										}

										service.loadReportTypeList = function() {

											$http
													.get(
															'../components/reportDetail/reportTypesData.json')
													.success(
															function(data) {
																service.reportTypeList = data;
															});
										}

										service.getReportTypeList = function() {
											return service.reportTypeList;
										}

										service.saveReport = function(report) {
											var rndValue = Math.floor((Math
													.random() * 100) + 1);

											// se actualiza la lista de sujetos

											var newReportCode = "RE20000"
													+ rndValue;

											report.reportCode = newReportCode;
											report.actionCode = IncidentSrv
													.getSelectedAction();
											report.taskList = [];

											var initialTask = {
												version : '0',
												creador : 'Juan Gomez',
												fechaVersion : '10/02/2015',
												estadoEnvio : 'Pendiente'
											};

											report.taskList.push(initialTask);

											if (!$rootScope.reportList) {
												$rootScope.reportList = [];
											}

											$rootScope.reportList.push(report);

											// Enviar un neuvo informte al
											// servicio de informes

											/*
											var myReportData = {
												"datos" : {
													"cabecera" : {
														"instituto" : report.instituteName,
														"dirsubdir" : report.instituteClass
													},
													"pie" : {
														"instituto" : report.instituteName,
														"dirsubdir" : report.instituteClass,
														"direccion" : report.instituteAddress,
														"telefono" : report.institutePhone
													},
													"lateral" : {
														"destinatario" : report.subjectName,
														"referencia" : report.subjectCode,
														"sujeto" : report.subjectIdentifier
													},
													"datosinforme" : {
														"destinatario" : report.addresseeName,
														"referencia" : report.addresseeRefNumber,
														"fecha" : report.addresseeDate,
														"episodio" : report.incidentCode
													},
													"titulo" : report.reportDataTitle,
													"informacion" : {
														"texto" : report.reportDataText,
														"cierre" : report.reportDataEnd
													},
													"firma" : report.reportSign
												}
											};*/

										};

										return service;
									} ]);

		});
