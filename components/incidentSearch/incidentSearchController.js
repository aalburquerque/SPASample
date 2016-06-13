define(
		[ 'app' ],
		function(app) {


			app
					.controller(
							'IncidentSearchCtrl',
							[
									'$scope',
									'$rootScope',
									'IncidentSearchSrv',
									'IncidentSrv',
									'growl',
									function($scope, $rootScope,
											IncidentSearchSrv, IncidentSrv, growl) {

										var paginationOptions = {
											pageNumber : 1,
											pageSize : 5,
											sort : null
										};

										$scope.searchText='';

										$scope.showSuccess = function(){
											// growl.success('This is a success mesage.',{title: 'Success!'});
											alert('success');
										}

										$scope.incidentGridOptions = {
											enableFiltering : true,
											paginationPageSizes: [5, 10, 15],
										    paginationPageSize: 5,
											useExternalPagination : true,
											useExternalSorting : true,
											columnDefs : [
													{
														field : 'incidentCode',
														displayName : 'Id',
														width : 2 * 85,
														resizable : true
													},
													{
														field : 'procedureType',
														displayName : 'Tipo Proc.',
														width : 3 * 85,
														resizable : true
													},
													{
														field : 'juditialBody',
														displayName : 'Org. Judicial',
														width : 4 * 85,
														resizable : true
													},
													{
														field : 'procedureNumber',
														displayName : 'N/Año',
														width : 2 * 85,
														resizable : true
													},
													{
														field : 'factTime',
														displayName : 'Fecha',
														width : 3 * 85,
														resizable : true
													},
													{
														field : 'operacion',
														cellTemplate : '<div>'
																+ '  <a href="#incidentDetail" ng-click="grid.appScope.setSelectedIncident(COL_FIELD)">  <span class="glyphicon glyphicon-pencil" > </span>  </a> '
																+ '</div>',
														width : 85
													} ],
											onRegisterApi : function(gridApi) {
												$scope.gridApi = gridApi;
												$scope.gridApi.core.on
														.sortChanged(
																$scope,
																function(grid,
																		sortColumns) {
																	if (sortColumns.length == 0) {
																		paginationOptions.sort = null;
																	} else {
																		paginationOptions.sort = sortColumns[0].sort.direction;
																	}
																	getPage(paginationOptions.pageNumber, paginationOptions.pageSize, $scope.searchText);
																});
												gridApi.pagination.on
														.paginationChanged(
																$scope,
																function(
																		newPage,
																		pageSize) {
																	paginationOptions.pageNumber = newPage;
																	paginationOptions.pageSize = pageSize;
																	getPage(paginationOptions.pageNumber, paginationOptions.pageSize, $scope.searchText);
																});
											}
										};

										var getPage = function(pageNumber, pageSize, searchText) {
/*
											var url;
											switch (paginationOptions.sort) {
											case uiGridConstants.ASC:
												url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
												break;
											case uiGridConstants.DESC:
												url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
												break;
											default:
												url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
												break;
											}
*/
/*
											$http
													.get(url)
													.success(
															function(data) {
																$scope.gridOptions.totalItems = 100;
																var firstRow = (paginationOptions.pageNumber - 1)
																paginationOptions.pageSize;
																$scope.gridOptions.data = data
																		.slice(
																				firstRow,
																				firstRow
																						+ paginationOptions.pageSize);
															});
*/

											IncidentSearchSrv.getIncidentItems(pageNumber,pageSize, searchText);

											// total elementos de la busqueda
											$scope.incidentGridOptions.totalItems =  $rootScope.totalIncidentsToPresent;

											// lista de filas de la pagina activa
											$scope.incidentGridOptions.data = $rootScope.incidentsToPresentList;
										};



										$scope.setSelectedIncident = function(
												selectedIncident) {
											IncidentSrv
													.setSelectedIncident(selectedIncident);
										};

										$scope.saveData = function() {

											localStorage
													.setItem(
															'subjectList',
															JSON
																	.stringify($rootScope.subjectList));
											localStorage
													.setItem(
															'incidentList',
															JSON
																	.stringify($rootScope.incidentList));
											localStorage
													.setItem(
															'actionList',
															JSON
																	.stringify($rootScope.actionList));
										};

										$scope.executeSearch = function() {

											paginationOptions.pageNumber=1;
											paginationOptions.pageSize =5;
											paginationOptions.sort=null;

											getPage(paginationOptions.pageNumber, paginationOptions.pageSize, $scope.searchText);

										 growl.warning("this will not be closed automatically", {ttl: -1});
										};

									} ]);

		});
