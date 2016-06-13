define(
		[ 'app' ],
		function(app) {
			app
					.controller(
							'ActionDetailCtrl',
							[
									'$scope',
									'ActionDetailSrv',
									'IncidentSrv',
									function($scope, ActionDetailSrv,
											IncidentSrv) {

										$scope.action = {
											actionCode : IncidentSrv
													.getSelectedAction(),
											subjectCode : IncidentSrv
													.getSelectedSubject()
										};
										// load action
										if ($scope.action.actionCode
												&& $scope.action.actionCode != '') {
											$scope.action = IncidentSrv
													.loadAction($scope.action.actionCode);
										}

										$scope.showActionCode = function() {
											return IncidentSrv
													.getSelectedAction() != '';
										}

										// iniciar los combo box
										$scope.actionStatusList = ActionDetailSrv
												.getActionStatusList();
										$scope.selectedAction = IncidentSrv
												.getSelectedAction();
										$scope.selectedSubject = IncidentSrv
												.getSelectedSubject();
										$scope.roleList = ActionDetailSrv
												.getRoleItems();
										
										$scope.reportTypeList=ActionDetailSrv.getReportTypeList();

										$scope.getExpertItems = function() {
											var result = [];
											if ($scope.action
													&& $scope.action.roleId) {
												result = ActionDetailSrv
														.getExpertItems($scope.action.roleId)
											}
											$scope.expertList = result;
										};

										$scope.implicationList = ActionDetailSrv
												.getImplicationList();
										$scope.assistanceList = ActionDetailSrv
												.getAssistanceList();

										$scope.saveAction = function() {
											ActionDetailSrv
													.saveAction($scope.action);
										}
										$scope.gridOptions = {

											data : ActionDetailSrv
													.getActionReports($scope.action.actionCode),

											enableSorting : false,

											enableFiltering : false,

											showTreeExpandNoChildren : false,

											enableRowSelection : false,

											enableRowHeaderSelection : true,

											multiSelect : false,

											noUnselect : true,

											modifierKeysToMultiSelect : false,

											columnDefs : [

													{
														name : 'codigo'
													},

													{
														name : 'version'
													},

													{
														name : 'creador'
													},

													{
														name : 'fecha version'
													},

													{
														name : 'estado envio'
													},

													{
														name : 'operacion',
														cellTemplate : '<div>'
																+ '  <a href="#reportDetail" ng-click="grid.appScope.setSelectedItem(COL_FIELD,row.entity.codigo)"> <span class="glyphicon glyphicon-pencil"></span>  </a> '
																+ ' <a href="#reportDetail" ng-click="grid.appScope.setSelectedItem(COL_FIELD,row.entity.codigo)"><span class="glyphicon glyphicon-remove"></span></a> '
																+ '</div>'
													} ],

											onRegisterApi : function(gridApi) {

												$scope.gridApi = gridApi; // i'd
												// recommend
												// a promise
												// or
												// deferred
												// for this

												var onRowsRenderedOff = gridApi.core.on
														.rowsRendered(
																null,
																function() {

																	onRowsRenderedOff(); // run
																	// once

																	triggerRowSelectOnClick('#grid1'); // requires
																	// '.ui-grid-canvas'

																});

											}

										};

										function triggerRowSelectOnClick(
												yourGridId) {

											$(
													yourGridId
															+ ' .ui-grid-contents-wrapper > [role=grid] .ui-grid-canvas')

													.delegate(
															'.ui-grid-row',
															'click',
															function(ev) {

																jqRow = $(this); // '.ui-grid-row'

																var index = jqRow
																		.index();

																var commonAncestor = jqRow
																		.closest(yourGridId
																				+ ' .ui-grid-contents-wrapper');

																var selectButtonQuery = [

																		'.ui-grid-pinned-container', // left
																		// side
																		// class

																		'[role=grid] .ui-grid-canvas', // redundant,
																		// but
																		// doesn't
																		// hurt

																		'.ui-grid-row .ui-grid-selection-row-header-buttons' // select
																// button
																// class

																].join(' ');

																var checkboxDiv = commonAncestor
																		.find(selectButtonQuery);

																checkboxDiv
																		.get(
																				index)
																		.click();

															});

										}
										;

										$scope.setSelectedReport = function(
												selectedReport) {
											IncidentSrv
													.setSelectedReport(selectedReport);
											IncidentSrv
													.setSelectedAction($scope.action.actionCode);
											IncidentSrv
													.setSelectedReportType($scope.reportTypeId);
										};

										/* fecha */
										$scope.today = function() {
											$scope.action.startDate = new Date();
										};
										$scope.today();

										$scope.clear = function() {
											$scope.action.startDate = null;
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
											minDate : new Date(1900, 1, 1),
											startingDay : 1
										};

										// Disable weekend selection
										function disabled(data) {
											// var date = data.date, mode =
											// data.mode;
											// return mode === 'day'
											// && (date.getDay() === 0 || date
											// .getDay() === 6);
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
										
										$scope.open2 = function() {
											$scope.popup2.opened = true;
										};

										$scope.formats = [ 'dd/MM/yyyy' ];

										$scope.format = $scope.formats[0];
										$scope.altInputFormats = [ 'M!/d!/yyyy' ];

										$scope.popup1 = {
											opened : false
										};
										
										$scope.popup2 = {
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
