export const ageCalc = (dataNascimento: Date) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    // Ajusta se ainda não fez aniversário no ano atual
    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
        idade--;
    }

    return idade;
}