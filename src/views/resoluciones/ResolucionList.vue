<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header bg-info d-flex justify-content-between align-items-center py-2">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Resoluciones</h5>
					<router-link to="/resoluciones/create">
						<button class="btn btn-outline-light font-weight-bold ml-auto" @click="addItem"><i class="cil-plus"></i> Nueva Resolución</button>
					</router-link>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body">
							<div><h5 class="font-weight-bold">Opciones de Búsqueda</h5></div>
							<div class="row">

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="codigoResolucion" class="col-sm-4 col-form-label text-sm-right">Código o Nurej:</label>
										<div class="col">
											<input type="search" v-model="params.codigoResolucion" class="form-control" id="codigoResolucion" placeholder="Ingrese el codigo o nurej ...">
										</div>
									</div>
								</div>
								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="nroResolucion" class="col-sm-4 col-form-label text-sm-right">Número de Resolución:</label>
										<div class="col">
											<input type="search" v-model="params.nroResolucion" class="form-control" id="nroResolucion" placeholder="Ingrese el Nro. de la Resolución ...">
										</div>
									</div>
								</div>

								<div v-if="userLogged.rol.includes('Administrador')" class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="departamento" class="col-sm-4 col-form-label text-sm-right">Departamento:</label>
										<div class="col">
											<select v-model="params.idDepartamento" class="form-control" id="departamento" @keypress.enter.prevent="search" @change="onSelectDepartamento($event)">
												<option v-for="item in departamentosDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div v-if="userLogged.rol.includes('Administrador')" class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="municipio" class="col-sm-4 col-form-label text-sm-right">Municipio:</label>
										<div class="col">
											<select v-model="params.idMunicipio" class="form-control" id="municipio" @keypress.enter.prevent="search" @change="onSelectMunicipio($event)">
												<option v-for="item in municipiosDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div v-if="userLogged.rol.includes('Administrador')" class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="oficina" class="col-sm-4 col-form-label text-sm-right">Sala:</label>
										<div class="col">
											<select v-model="params.idOficina" class="form-control" id="oficina" @keypress.enter.prevent="search">
												<option v-for="item in oficinasDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="gestion" class="col-sm-4 col-form-label text-sm-right">Gestión:</label>
										<div class="col">
											<select v-model="params.gestion" class="form-control" id="gestion" @keypress.enter.prevent="search">
												<option v-for="item in gestionesDropList" v-bind:value="item">{{ item }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="tipoResolucion" class="col-sm-4 col-form-label text-sm-right">Tipo de Resolución:</label>
										<div class="col">
											<select v-model="params.idTipoResolucion" class="form-control" id="tipoResolucion" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="proceso" class="col-sm-4 col-form-label text-sm-right">Tipo Penal:</label>
										<div class="col">
											<select v-model="params.idProceso" class="form-control" id="proceso" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="estado" class="col-sm-4 col-form-label text-sm-right">Estado:</label>
										<div class="col">
											<select v-model="params.idEstado" class="form-control" id="estado" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-for="item in estadosDropList" v-bind:value="item.value">{{ item.text }}</option>
												<!--<option v-bind:value="1">Pendiente</option>
												<option v-bind:value="2">Enviado</option>
												<option v-bind:value="3">Rechazado</option>
												<option v-bind:value="4">Validado</option>-->
											</select>
										</div>
									</div>
								</div>

								<!--<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="demandante" class="col-sm-4 col-form-label text-sm-right">Demandante:</label>
										<div class="col">
											<input type="search" v-model="params.demandante" class="form-control" id="demandante">
										</div>
									</div>
								</div>
								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="demandado" class="col-sm-4 col-form-label text-sm-right">Demandado:</label>
										<div class="col">
											<input type="search" v-model="params.demandado" class="form-control" id="demandado">
										</div>
									</div>
								</div>-->

								<div class="my-1 col-lg-12 text-sm-right">
									<button class="btn btn-info mr-1" type="button" @click="getItems"><i class="cil-search"></i> Buscar</button>
									<button class="btn btn-secondary" type="button" @click="limpiarCampos"><i class="cil-minus"></i> Limpiar</button>
								</div>
							</div>
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-hover table-sm datatable">
									<thead>
										<tr>
											<th class="text-center">N°</th>
											<th @click="sortItems('numeroResolucion')" class="pr-4">Nro. Resolución <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'numeroResolucion' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('fechaResolucion')" class="pr-4">Fecha Emisión <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'fechaResolucion' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('tipoResolucion')" class="pr-4">Tipo Resolución <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'tipoResolucion' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('formaResolucion')" class="pr-4">Forma Resolución <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'formaResolucion' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('proceso')" class="pr-4">Tipo Penal <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'proceso' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('materia')" class="pr-4">Materia <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'materia' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('codigoResolucion')" class="pr-4">Codigo o Nurej <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'codigoResolucion' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('estado')" class="pr-4">Estado <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'activo' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sortItems('fechaRegistro')" class="pr-4">Fecha Registro <i class="c-icon arrow-position" :class="paramsSort.orderBy === 'fechaRegistro' ? (paramsSort.orderDirection == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!resoluciones.length">
											<td class="lead text-center" colspan="10">No se encontraron resultados.</td>
										</tr>
										<tr v-if="isLoadingResolucion">
											<td class="lead text-center" colspan="10">
												<div class="spinner-border" role="status">
													<span class="sr-only">Cargando...</span>
												</div>
											</td>
										</tr>
										<tr v-for="(item, index) in resoluciones" :key="index">
											<td class="text-center">{{index + 1}}</td>
											<td>{{item.numeroResolucion}}</td>
											<td>{{item.fechaResolucionFormat}}</td>
											<td>{{item.tipoResolucion}}</td>
											<td>{{item.formaResolucion}}</td>
											<td width="20%">{{item.proceso}}</td>
											<td>{{item.materia}}</td>
											<td>{{item.codigoResolucion}}</td>
											<td>
												<span v-if="item.idEstado==1" class="badge badge-info">Pendiente de Envío</span>
												<span v-else-if="item.idEstado==2" class="badge badge-warning">Enviado</span>
												<span v-else-if="item.idEstado==3" class="badge badge-danger">Rechazado</span>
												<span v-else class="badge badge-success">Validado</span>
											</td>
											<td>{{item.fechaRegistroFormat}}</td>
											<td class="fit">
												<router-link v-if="userLogged.rol=='Juzgado' && (item.idEstado==1 || item.idEstado==3)" class="btn btn-info btn-sm" :to="{ name: 'resoluciones.edit', params: { id: item.idResolucion } }">
													<i class="c-icon cil-pencil"></i>
												</router-link>
												<router-link v-else class="btn btn-success btn-sm" :to="{ name: 'resoluciones.detail', params: { id: item.idResolucion } }">
													<i class="c-icon cil-zoom-in"></i>
												</router-link>
												<button v-if="item.registroActivo && userLogged.rol.includes('Administrador')" title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.idResolucion)">
													<i class="c-icon cil-x"></i>
												</button>
												<!--<button v-else title="Activar" class="btn btn-warning btn-sm ml-1" @click="restoreItem(item.idResolucion)">
													<i class="c-icon cil-reload"></i>
												</button>-->
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapGetters, mapActions, mapMutations } from "vuex"
	import ResolucionAdd from './ResolucionAdd.vue'

	export default {
		name: "ResolucionList",
		components: {
			ResolucionAdd
		},
		data() {
			return {
				params: {
					idDepartamento: 0,
					idMunicipio: 0,
					idOficina: 0,
					gestion: 0,
					idTipoResolucion: 0,
					idProceso: 0,
					idEstado: 0,
					codigoResolucion: '',
					nroResolucion: '',
				},
				paramsSort: {
					orderBy: "fechaRegistro",
					orderDirection: "desc",
				}
			};
		},
		async created() {
			//console.log(this.userLogged);
			if(this.userLogged.rol.includes('Administrador')) {
				await this.fetchDepartamentosDropList();
				this.params.idDepartamento = this.departamentosDropList[0].value;
				await this.fetchMunicipiosDropList(this.params.idDepartamento);
				this.params.idMunicipio = this.municipiosDropList[0].value;
				await this.fetchOficinasDropList(this.params.idMunicipio);
				this.params.idOficina = this.oficinasDropList[0].value;
			}
			else {
				//this.params.idDepartamento = this.userLogged.idDepartamento;
				//this.params.idMunicipio = this.userLogged.idMunicipio;
				this.params.idOficina = this.userLogged.idOficina;
			}
			await this.fetchGestionesDropList();
			this.params.gestion = this.gestionesDropList[0];
			await this.fetchTiposResolucionesDropList();
			await this.fetchProcesosDropList();
			await this.fetchEstadosDropList();
			await this.fetchAllResoluciones(this.params);
			this.fetchOrderResoluciones(this.paramsSort);
			
		},
		computed: { ...mapGetters(["userLogged","resoluciones", "isLoadingResolucion", "departamentosDropList", "municipiosDropList", "oficinasDropList",  "gestionesDropList", "tiposResolucionesDropList", "procesosDropList", "estadosDropList"]) },
		methods: {
			...mapActions(["fetchAllResoluciones", "fetchOrderResoluciones", "deleteResolucion", "activarResolucion", "fetchDepartamentosDropList", "fetchMunicipiosDropList", "fetchOficinasDropList", "fetchGestionesDropList", "fetchTiposResolucionesDropList", "fetchProcesosDropList", "fetchEstadosDropList"]),
			...mapMutations(["SET_EDIT_MODE_RESOLUCION"]),

			async getItems() {
				if (this.params.idOficina || this.params.gestion || this.params.idTipoResolucion || this.params.idProceso || this.params.idEstado || this.params.codigoResolucion || this.params.nroResolucion) {
					//console.log(this.params);
					await this.fetchAllResoluciones(this.params);
					this.fetchOrderResoluciones(this.paramsSort);
				}
				else {
					Swal.fire('Aviso', 'Debe seleccionar al menos un campo de búsqueda.', 'warning');
				}
			},
			sortItems: function(column) {
				if (column === this.paramsSort.orderBy) {
					this.paramsSort.orderDirection = this.paramsSort.orderDirection === "asc" ? "desc" : "asc";
				}
				this.paramsSort.orderBy = column;
				this.fetchOrderResoluciones(this.paramsSort);
			},
			addItem() {
				this.SET_EDIT_MODE_RESOLUCION(false);
				//this.$router.push({ name: "resoluciones.create" });
			},
			editItem(item) {
				this.SET_EDIT_MODE_RESOLUCION(true);
			},
			deleteItem(id) {
				Swal.fire({
					title: "Esta seguro que desea eliminar esta Resolución?",
					text: "La resolucion pasará a estado Inactivo!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				})
				.then(result => {
					if (result.value) {
						this.deleteResolucion(id);
					}
				});
			},
			restoreItem(id) {
				Swal.fire({
					title: "Esta seguro que desea Activar esta Resolución?",
					text: "La resolución pasará a estado Activo!",
					icon: "info",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				})
				.then(result => {
					if (result.value) {
						this.activarResolucion(id);
					}
				});
			},
			async onSelectDepartamento(event) {
				await this.fetchMunicipiosDropList(event.target.value);
				this.params.idMunicipio = this.municipiosDropList[0].value;
				await this.fetchOficinasDropList(this.params.idMunicipio);
				this.params.idOficina = this.oficinasDropList[0].value;
			},
			async onSelectMunicipio(event) {
				await this.fetchOficinasDropList(event.target.value);
				this.params.idOficina = this.oficinasDropList[0].value;
			},
			limpiarCampos() {
				this.params.codigoResolucion = "";
				this.params.nroResolucion = "";
				this.params.idTipoResolucion = 0;
				this.params.idProceso = 0;
				this.params.idEstado = 0;
			},
		}
	}
</script>