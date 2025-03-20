<template>
  <aside class="painel-body">
    <section class="sidebar">
      <picture class="logo">
        <img src="../../assets/images/logo.svg" alt="Logo" class="logo-image" />
      </picture>
      <nav class="menu" aria-label="Painel de dados">
        <dl>
          <dt class="menu-title">PAINEL DE DADOS</dt>
          <dd>
            <ul role="list" class="menu-list">
              <li role="listitem" class="menu-item">
                <i title="Dashboard"></i>
                <span>Dashboard</span>
              </li>
              <li role="listitem" class="menu-item">
                <i title="Configurações"></i>
                <span>Configurações</span>
              </li>
              <li role="listitem" class="menu-item" @click="handleLogout">
                <i title="Sair"></i>
                <span>Sair</span>
              </li>
            </ul>
          </dd>
        </dl>
      </nav>
    </section>
  </aside>
</template>

<script>
import AuthService from '../../services/auth.service';

export default {
  methods: {
    handleLogout() {
      console.log('Logout');
      AuthService.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />