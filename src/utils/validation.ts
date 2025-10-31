export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // CPF precisa ter 11 dígitos
    if (cpf.length !== 11) {
        return false
    };

    // Rejeita CPFs com todos os dígitos iguais (ex: 11111111111)
    if (/^(\d)\1+$/.test(cpf)) {
        return false
    };

    // Validação dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0
    };

    if (resto !== parseInt(cpf.charAt(9))) {
        return false
    };

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0
    };

    if (resto !== parseInt(cpf.charAt(10))) {
        return false
    };

    return true;
}