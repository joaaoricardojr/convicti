<template>
    <div>
      <h3>Erros</h3>
      <div v-if="loading">Carregando...</div>
    <div v-else-if="error">Erro: {{ error }}</div>
    <div v-else>
      <p>Total: {{ totalItens }}</p>
      <p>Android: {{ androidCount }}</p>
      <p>Apple: {{ appleCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getDados } from '../../services/useApi.service';
  import { contarPlataformas } from '@/utils/contarPlataformas';
  
  export default {
    data() {
      return {
        totalItens: 0,
        androidCount: 0,
        appleCount: 0,
        loading: true,
        error: null,
      };
    },
    async mounted() {
      try {
        let allItems = [];
        let page = 1;
        let response;
  
        do {
          response = await getDados(`/errors?page=${page}`);
          if (response && response.data && Array.isArray(response.data.data)) {
            allItems = allItems.concat(response.data.data);
            page++;
          } else {
            console.error("Erro: Resposta da API inválida.");
            break;
          }
        } while (page <= response.data.last_page);

        console.log("responseErros", response.data);
  
        const { androidCount, appleCount } = contarPlataformas({ data: { data: allItems } });
        this.totalItens = response.data.total;
        this.androidCount = androidCount;
        this.appleCount = appleCount;
        this.loading = false;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        this.error = error.message;
        this.loading = false;
      }
    },
  };
  </script>