<template>
  <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
    <router-link class="c-sidebar-brand d-md-down-none" tag="a" to="/">
      <img class="c-sidebar-brand-full" src="../assets/img/Logo_KrimaOJ_blanco.png" width="157" height="41">
      <img class="c-sidebar-brand-minimized" src="../assets/img/Logo_KrimaOJ.png" width="" height="41">
    </router-link>
    <ul v-if="userLogged.rol.includes('Administrador')" class="c-sidebar-nav" id="ul">
      <li class="c-sidebar-nav-title">Menu Principal</li>
      <!--<router-link class="c-sidebar-nav-item" tag="li" to="/">
        <a class="c-sidebar-nav-link">
          <i class="cil-speedometer c-sidebar-nav-icon"></i> Inicio
        </a>
      </router-link>-->
      <router-link class="c-sidebar-nav-item" class-active="active" tag="li" to="/resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-color-border c-sidebar-nav-icon"></i> Resoluciones
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/materias">
        <a class="c-sidebar-nav-link">
          <i class="c-sidebar-nav-icon cil-menu"></i> Materias
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/procesos">
        <a class="c-sidebar-nav-link">
          <i class="cil-notes c-sidebar-nav-icon"></i> Procesos
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/tipos_resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-layers c-sidebar-nav-icon"></i> Tipos de Resoluciones
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/formas_resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-screen-smartphone c-sidebar-nav-icon"></i> Formas de Resoluciones
        </a>
      </router-link>
      <!--<router-link class="c-sidebar-nav-item" tag="li" to="/about">
        <a class="c-sidebar-nav-link">
          <i class="cil-color-border c-sidebar-nav-icon"></i> Acerca De
        </a>
      </router-link>-->
    </ul>
    <ul v-else class="c-sidebar-nav" id="ul">
      <li class="c-sidebar-nav-title">Menu Principal</li>
      <router-link class="c-sidebar-nav-item" tag="li" to="/">
        <a class="c-sidebar-nav-link">
          <i class="cil-speedometer c-sidebar-nav-icon"></i> Inicio
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" class-active="active" tag="li" to="/resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-menu c-sidebar-nav-icon"></i> Lista de Resoluciones
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/resoluciones/create">
        <a class="c-sidebar-nav-link">
          <i class="cil-plus c-sidebar-nav-icon"></i> Registrar Resolucion
        </a>
      </router-link>
    </ul>
    <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
  </div>
</template>


<style scoped>
#ul a.router-link-active {
  background: #39f;
  color: #fff;
}
.c-sidebar-nav-link {
  color: white;
}
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(["userLogged"]),
  }
};
</script>