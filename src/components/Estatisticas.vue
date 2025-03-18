<template>
  <div>
    <h1>Estatísticas</h1>
    <div v-if="permissao === 'admin'">
      <h2>Estatísticas Administrativas</h2>
      <p>Total de usuários: 100</p>
      <p>Total de acessos: 1000</p>
    </div>
    <div v-else-if="permissao === 'usuario'">
      <h2>Estatísticas do Usuário</h2>
      <p>Seus últimos acessos: 10</p>
    </div>
    <div v-else>
      <p>Você não tem permissão para visualizar as estatísticas.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Aqui você buscaria a permissão do usuário da API
      // Simulando um usuário comum
      permissao: 'usuario',
    };
  },
};
</script>