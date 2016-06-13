define(
		[ 'app' ],
		function(app) {

			app.directive("numprocedimientoValidation", function(){
		    	return{
		    		restrict:"A",
		    		require:"ngModel",
		    		link:function(scope, element, attrs, ctrls){
		    			ctrls.$validators.testing = function(value){
		    				if(!value){
		    					return false;
		    				}

		    				var isMatched = value.match(/\d{1,24}\/\d{4}/g);

		    				if(isMatched){

		    					var actualYear=new Date().getFullYear();
		    					var result=value.substring(1+value.indexOf('/'),value.lenght)<=actualYear;
		    					return result;
		    				}
		    				return false
		    			}
		    		}
		    	}
		    });

			app.controller(
							'IncidentDetailCtrl',
							[
									'$scope',
									'$location',
									'IncidentDetailSrv',
									'IncidentSrv',
									function($scope, $location, IncidentDetailSrv,
											IncidentSrv) {


										$scope.incident = {
											incidentCode : IncidentSrv
													.getSelectedIncident(),
											idIml : 0,
											idTipoorgjudicial : 0,
											judicialBodyId : 0
										};

										$scope.getOrgJudicialItems = function() {
											$scope.orgJudicialItems = IncidentDetailSrv
													.getOrgJudicialItems($scope.incident.idTipoorgjudicial);
										}

										$scope.getTipoOrgJudicialesItems = function() {
											$scope.tipoOrgJudicialesItems = IncidentDetailSrv
													.getTipoOrgJudicialesItems($scope.incident.idIml);
											$scope.orgJudicialItems = [];
										};

										// load incident
										if ($scope.incident.incidentCode
												&& $scope.incident.incidentCode != '') {
											$scope.incident = IncidentDetailSrv
													.loadIncident($scope.incident.incidentCode);
											$scope.getTipoOrgJudicialesItems();
											$scope.getOrgJudicialItems();
											// set options for iml and
											// TipoOrgJudicial combo boxes
											if ($scope.incident.judicialBodyId) {
												var ref1;
												for (var i = 0; i < IncidentSrv
														.getMasterValues().orgJudList.length; i++) {
													if (IncidentSrv
															.getMasterValues().orgJudList[i]['id'] == $scope.incident.judicialBodyId) {
														ref1 = IncidentSrv
																.getMasterValues().orgJudList[i]['refId'];
														break;
													}
												}
												if (ref1) {
													$scope.incident.idTipoorgjudicial = ref1;
												}
											}
											if ($scope.incident.idTipoorgjudicial) {
												var ref2;
												for (var i = 0; i < IncidentSrv
														.getMasterValues().tipoOrganismoJudicialList.length; i++) {
													if (IncidentSrv
															.getMasterValues().tipoOrganismoJudicialList[i]['id'] == $scope.incident.idTipoorgjudicial) {
														ref2 = IncidentSrv
																.getMasterValues().tipoOrganismoJudicialList[i]['refId'];
														break;
													}
												}
												if (ref2) {
													$scope.incident.idIml = ref2;
												}
											}

										} // fin load Incident

										/* Fecha */

										$scope.today = function() {
											$scope.incident.factTimeInYear = new Date();
										};
										$scope.today();

										$scope.incident.factTimeInDay=new Date();

										$scope.clear = function() {
											$scope.incident.factTimeInYear = null;
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
//											var date = data.date, mode = data.mode;
//											return mode === 'day'
//													&& (date.getDay() === 0 || date
//															.getDay() === 6);
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
											$scope.incident.factTimeInYear = new Date(year, month,
													day);
										};

//										$scope.formats = [ 'dd-MMMM-yyyy',
//												'yyyy/MM/dd', 'dd.MM.yyyy',
//												'shortDate' ];

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
										/* Fin Fecha */

										$scope.showIncidentCode = function() {
											return IncidentSrv
													.getSelectedIncident() != '';
										}

										// init combo boxes
										$scope.imlItems = IncidentDetailSrv
												.getImlItems();

										$scope.tipoProcList = IncidentDetailSrv
												.getTipoProcList();

										$scope.saveIncident = function() {

											if ($scope.myForm.$invalid) {
												alert('El formulario no esta completo');
												return;
											}

											var incidentPersisted=IncidentDetailSrv
													.saveOrUpdateIncident($scope.incident);
											if(incidentPersisted.incidentCode)		{
												IncidentSrv
															.setSelectedIncident(incidentPersisted);
											}

											//$location.url('#menuSujetosYActuaciones');
										}

										$scope.setSelectedItemToAdd = function(
												selectedItemParam, codItem) {
											if (selectedItemParam == '#subjectDetail') {
												IncidentSrv
														.setSelectedSubject(codItem);
												IncidentSrv
														.setSelectedAction('');
											} else if (selectedItemParam == '#actionDetail') {
												IncidentSrv
														.setSelectedSubject(codItem);
												IncidentSrv
														.setSelectedAction('');
											}
										}

										$scope.setSelectedItemToUpdate = function(
												selectedItemParam, codeItem) {
											if (selectedItemParam == '#subjectDetail') {
												IncidentSrv
														.setSelectedSubject(codeItem);
												IncidentSrv
														.setSelectedAction('');
											} else if (selectedItemParam == '#actionDetail') {
												IncidentSrv
														.setSelectedSubject('');
												IncidentSrv
														.setSelectedAction(codeItem);
											}
										}

										$scope.setSelectedSubject = function(
												selectedSubject) {
											IncidentSrv
													.setSelectedSubject(selectedSubject);
										};

										var colWidth=65;

										$scope.gridOptions = {

											data : IncidentDetailSrv
													.getSubjectsActions(),

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
														field : 'codigo', displayName: 'Cod.', width: 2*colWidth
													},

													{
														field : 'tipo' , displayName: 'Tipo', width: 4*colWidth
													},

													{
														field : 'identificador' , displayName: 'Id.', width: colWidth
													},

													{
														field : 'nombre' , displayName: 'Nombre', width: 3*colWidth
													},

													{
														field : 'perito', displayName: 'Perito', width: 3*colWidth
													},

													{
														field : 'interconsulta', displayName: 'Interc.', width: colWidth
													},

													{
														field : 'estado' , displayName: 'Estado', width: colWidth
													},

													{
														name : 'operacion',
														cellTemplate : '<div>'
																+ '  <a href="{{row.entity.operacion}}" ng-click="grid.appScope.setSelectedItemToUpdate(COL_FIELD,row.entity.codigo)"> <span class="glyphicon glyphicon-pencil"></span>  </a> '
																+ ' <a href="{{row.entity.operacionAdd}}" ng-click="grid.appScope.setSelectedItemToAdd(COL_FIELD,row.entity.codigo)"><span class="glyphicon glyphicon-plus"></span></a> '
																+ '</div>',
																width: colWidth
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

										};



									} ]);
		});
