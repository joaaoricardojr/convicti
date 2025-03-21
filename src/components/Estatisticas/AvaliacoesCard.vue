<template>
    <div>
        <h3>Avaliações</h3>
        <div v-if="loading">Carregando...</div>
        <div v-else-if="error">Erro: {{ error }}</div>
        <div v-else>
            <p>Média Ponderada: {{ mediaPonderada }} / 5</p>
            <p>Android: {{ mediaAndroid }} / 5</p>
            <p>iOS: {{ mediaIos }} / 5</p>
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
            mediaAndroid: 0,
            mediaIos: 0,
            mediaPonderada: 0,
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
                response = await getDados(`/evaluations?page=${page}`);
                if (response && response.data && Array.isArray(response.data.data)) {
                    allItems = allItems.concat(response.data.data);
                    page++;
                } else {
                    console.error("Erro: Resposta da API inválida.");
                    break;
                }
            } while (page <= response.data.last_page);

            // console.log("responseAvaliacoes", response.data);

            const { mediaAndroid, mediaIos, mediaPonderada } = contarPlataformas({ data: { data: allItems } });
            this.totalItens = response.data.total;
            this.mediaAndroid = mediaAndroid.toFixed(1);
            this.mediaIos = mediaIos.toFixed(1);
            this.mediaPonderada = mediaPonderada.toFixed(1);
            this.loading = false;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            this.error = error.message;
            this.loading = false;
        }
    },
};
</script>