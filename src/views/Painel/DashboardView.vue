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
              <li role="listitem" class="menu-item" :class="{ active: isDashboardActive }" @click="activateDashboard">
                <i title="Dashboard"></i>
                <span>Dashboard</span>
              </li>
              <li role="listitem" class="menu-item" :class="{ active: isConfiguracoesActive }"
                @click="activateConfiguracoes">
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
    <section v-if="isDashboardActive" class="content-section">
      <div class="cards">
        <h2 class="title-content-section">Estatísticas</h2>
        <div class="card-downloads">
          <DownloadsCard />
        </div>
        <div class="card-avaliacoes">
          <AvaliacoesCard />
        </div>
        <div class="card-erros">
          <ErrosCard />
        </div>
        <div class="card-feedbacks">
          <h3>Feedbacks</h3>
        </div>
        <div class="card-novas-funcionalidades">
          <h3>Novas Funcionalidades</h3>
        </div>
      </div>
    </section>
    <section v-else-if="isConfiguracoesActive" class="content-section-configs">
      <div class="cards">
        <h2 class="title-content-section">Configurações</h2>
        <div class="card-perfis">
          <h3>Perfis</h3>
        </div>
        <div class="card-usuarios">
          <h3>Usuários</h3>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
import DownloadsCard from '@/components/Estatisticas/DownloadsCard.vue';
import AvaliacoesCard from '@/components/Estatisticas/AvaliacoesCard.vue';
import AuthService from '../../services/auth.service';
import { getDados } from '../../services/useApi.service';
import ErrosCard from '@/components/Estatisticas/ErrosCard.vue';

export default {
  data() {
    return {
      dados: [],
      isDashboardActive: true,
      isConfiguracoesActive: false,
    };
  },
  components: {
    DownloadsCard,
    AvaliacoesCard,
    ErrosCard,
  },
  methods: {
    handleLogout() {
      console.log('Logout');
      AuthService.logout();
      this.$router.push('/login');
    },
    activateDashboard() {
      this.isDashboardActive = true;
      this.isConfiguracoesActive = false;
    },
    activateConfiguracoes() {
      this.isDashboardActive = false;
      this.isConfiguracoesActive = true;
    },
  },
  async mounted() {
    try {
      this.dados = await getDados('/me');
      console.log(this.dados);
      this.loading = false;
    } catch (error) {
      this.error = error.message;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />