define([ 'app' ], function(app) {
	app.controller('ReportDetailCtrl', [
			'$scope',
			'$http',
			'ReportDetailSrv',
			'IncidentSrv',
			function($scope, $http, ReportDetailSrv, IncidentSrv) {
				
				$scope.report = {};
				$scope.reportFields = {};
				
				/* Carga tipos de informe */
				$scope.reportTypeList=[];
				
				$scope.reportTypeId=IncidentSrv.getSelectedReportType();
				$scope.reportTypeList=ReportDetailSrv.getReportTypeList();
				
				$scope.loadReportFields=function() {
					$scope.reportFields={
							fields:[],
							reportName:''
					};
					if (!$scope.reportTypeList || !$scope.reportTypeId){
						return [];
					}
					for(var i=0;i<$scope.reportTypeList.length;i++){
						if ($scope.reportTypeList[i].reportId==$scope.reportTypeId){
							$scope.reportFields.fields=$scope.reportTypeList[i].fields;
							$scope.reportFields.reportName=$scope.reportTypeList[i].reportName;
							break;
						}
					}
				}
				
				/* Fin carga tipos de Informe */
				
				init();
				
				function init() {
					ReportDetailSrv.loadReportTypeList();
					$scope.loadReportFields();
				}

				$scope.selectedIncident = IncidentSrv.getSelectedIncident();
				$scope.selectedReport = IncidentSrv.getSelectedReport();
				$scope.selectedAction = IncidentSrv.getSelectedAction();
				$scope.selectedSubject = IncidentSrv.getSelectedSubject();
				$scope.reportName='';
				$scope.fields=[];
				
				
				
				if ($scope.selectedReport) {
					$scope.report = ReportDetailSrv
							.loadReport($scope.selectedReport);
				} else {
					// nuevo informe
					var action = {};
					if ($scope.selectedAction) {
						action = IncidentSrv.loadAction($scope.selectedAction);
						$scope.report = {
							actionCode : action.actionCode,
							subjectCode : action.subjectCode
						};
					}
				}

				$scope.saveReport = function() {
					$scope.report.reportFields=$scope.reportFields;
					ReportDetailSrv.saveReport($scope.report);
				}

				$scope.setSelectedItem = function(selectedItemParam, codItem) {
				}

			} ]);
});
