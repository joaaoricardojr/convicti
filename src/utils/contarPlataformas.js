export function contarPlataformas(response) {
    if (!response || !response.data || !Array.isArray(response.data.data)) {
        console.error("Erro: Resposta da API inválida.");
        return { androidCount: 0, appleCount: 0 };
    }

    let androidCount = 0;
    let appleCount = 0;
    let androidEvaluations = [];
    let iosEvaluations = [];


    response.data.data.forEach((item) => {
        if (item.platform && typeof item.platform === "string") {
            if (item.platform.toLowerCase() === "android") {
                androidEvaluations.push(item.evaluation);
                androidCount++;
            } else if (item.platform.toLowerCase() === "ios") {
                iosEvaluations.push(item.evaluation);
                appleCount++;
            }
        }
    });

    const mediaAndroid = calcularMedia(androidEvaluations);
    const mediaIos = calcularMedia(iosEvaluations);
    const mediaPonderada = calcularMediaPonderada(mediaAndroid, androidCount, mediaIos, appleCount);

    return { androidCount, appleCount, mediaAndroid, mediaIos, mediaPonderada };
}

function calcularMedia(evaluations) {
    if (evaluations.length === 0) {
        return 0;
    }
    const sum = evaluations.reduce((acc, curr) => acc + curr, 0);
    return sum / evaluations.length;
}

function calcularMediaPonderada(mediaAndroid, androidCount, mediaIos, appleCount) {
    const totalCount = androidCount + appleCount;
    if (totalCount === 0) {
      return 0; // Ou outro valor padrão, se apropriado
    }
    return (mediaAndroid * androidCount + mediaIos * appleCount) / totalCount;
  }