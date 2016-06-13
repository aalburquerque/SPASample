define([ 'app' ], function(app) {
	app.controller('SubjectDetailCtrl',

	[
			'$scope',
			'SubjectDetailSrv', 'IncidentSrv',
			function($scope, SubjectDetailSrv, IncidentSrv) {
				$scope.subject={
						subjectCode: IncidentSrv.getSelectedSubject()
				};
				// load Subject
				if ($scope.subject.subjectCode && $scope.subject.subjectCode!=''){
					$scope.subject=SubjectDetailSrv.loadSubject($scope.subject.subjectCode);
				}
				
				$scope.showSubjectCode=function(){
					return IncidentSrv.getSelectedSubject()!='';
				}

				// init combo boxes
				$scope.tipoIdentificadorList = SubjectDetailSrv
						.getTipoIdentificadorList();

				$scope.genderList = SubjectDetailSrv.getGenderList();

				$scope.educationList = SubjectDetailSrv.getEducationList();

				$scope.ocupationList = SubjectDetailSrv.getOcupationList();

				$scope.maritalStatusList = SubjectDetailSrv
						.getMaritalStatusList();

				// save function
				$scope.saveSubject = function() {
					SubjectDetailSrv.saveOrUpdateSubject($scope.subject);
				}
				
				/* fecha */
				$scope.today = function() {
					$scope.subject.dateOfBirth = new Date();
				};
				$scope.today();

				$scope.clear = function() {
					$scope.subject.dateOfBirth = null;
				};

				$scope.inlineOptions = {
					customClass : getDayClass,
					minDate : new Date(),
					showWeeks : true
				};

				$scope.dateOptions = {
					dateDisabled : disabled,
					formatYear : 'yyyy',
					maxDate : new Date(2020, 5, 22),
					minDate : new Date(1900, 1 , 1),
					startingDay : 1
				};

				// Disable weekend selection
				function disabled(data) {
//					var date = data.date, mode = data.mode;
//					return mode === 'day'
//							&& (date.getDay() === 0 || date
//									.getDay() === 6);
					return false;
				}

				$scope.toggleMin = function() {
					$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null
							: new Date();
					$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
				};

				$scope.toggleMin();

				$scope.open1 = function() {
					$scope.popup1.opened = true;
				};

				$scope.setDate = function(year, month,
						day) {
					$scope.subject.dateOfBirth = new Date(year, month,
							day);
				};

//				$scope.formats = [ 'dd-MMMM-yyyy',
//						'yyyy/MM/dd', 'dd.MM.yyyy',
//						'shortDate' ];
				
				$scope.formats = [ 'dd/MM/yyyy' ];
				
				$scope.format = $scope.formats[0];
				$scope.altInputFormats = [ 'M!/d!/yyyy' ];

				$scope.popup1 = {
					opened : false
				};

				var tomorrow = new Date();
				tomorrow
						.setDate(tomorrow.getDate() + 1);
				var afterTomorrow = new Date();
				afterTomorrow.setDate(tomorrow
						.getDate() + 1);
				$scope.events = [ {
					date : tomorrow,
					status : 'full'
				}, {
					date : afterTomorrow,
					status : 'partially'
				} ];

				function getDayClass(data) {
					var date = data.date, mode = data.mode;
					if (mode === 'day') {
						var dayToCheck = new Date(date)
								.setHours(0, 0, 0, 0);

						for (var i = 0; i < $scope.events.length; i++) {
							var currentDay = new Date(
									$scope.events[i].date)
									.setHours(0, 0, 0,
											0);

							if (dayToCheck === currentDay) {
								return $scope.events[i].status;
							}
						}
					}

					return '';
				}
				/* fin fecha */

			} ]);
});
