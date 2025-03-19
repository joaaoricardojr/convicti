<template>
    <div class="dashboard">
      <div class="sidebar">
        <Login />
      </div>
      <div class="main-content">
        <Estatisticas />
      </div>
    </div>
  </template>
  
  <script>
  import Estatisticas from '../../components/Estatisticas/Estatisticas.vue';

  
  export default {
    components: {
      Estatisticas,
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
  }
  
  .sidebar {
    width: 300px;
    background-color: #f0f0f0;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  </style>