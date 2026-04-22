export function calcularConsistencia(treinosRealizados, nivel_atividade) {

    let metaTreinosSemana = 0; 
    console.log("nivel bruto:", nivel_atividade);
    console.log("nivel tratado:", `"${nivel_atividade}"`);
    const nivel = nivel_atividade?.toLowerCase().trim();

    switch (nivel) {
        case "iniciante":
            metaTreinosSemana = 2; // média de 1–3
            break;
        case "moderado":
            metaTreinosSemana = 4; // média de 3–5
            break;
        case "avancado":
            metaTreinosSemana = 6; // média de 6–7
            break;
        default:
            metaTreinosSemana = 3; // valor padrão para quem não especificou
    }

    if (!metaTreinosSemana || metaTreinosSemana === 0) return 0;
    
    const percentual = (treinosRealizados / metaTreinosSemana) * 100;
    
    return Math.min(100, Math.round(percentual)); // nunca passa de 100%
}