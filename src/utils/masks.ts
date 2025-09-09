export const dateMask = (text: string) => {

    let cleaned = text.replace(/\D/g, "");

    // aplica dd/mm/aaaa
    if (cleaned.length > 2) {
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 5) {
        cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5);
    }
    if (cleaned.length > 10) {
        cleaned = cleaned.slice(0, 10);
    }

    return cleaned
}

export const cpfMask = (text: string) => {
    let cleaned = text.replace(/\D/g, ""); // remove tudo que não é número

    if (cleaned.length > 3) {
        cleaned = cleaned.slice(0, 3) + "." + cleaned.slice(3);
    }
    if (cleaned.length > 7) {
        cleaned = cleaned.slice(0, 7) + "." + cleaned.slice(7);
    }
    if (cleaned.length > 11) {
        cleaned = cleaned.slice(0, 11) + "-" + cleaned.slice(11);
    }
    if (cleaned.length > 14) {
        cleaned = cleaned.slice(0, 14); // limita a 14 caracteres
    }

    return cleaned;
};

export const phoneMask = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.length > 0) {
        cleaned = "(" + cleaned;
    }
    if (cleaned.length > 3) {
        cleaned = cleaned.slice(0, 3) + ") " + cleaned.slice(3);
    }
    if (cleaned.length > 10) {
        // celular com 9 dígitos
        cleaned = cleaned.slice(0, 10) + "-" + cleaned.slice(10);
    } else if (cleaned.length > 9) {
        // fixo
        cleaned = cleaned.slice(0, 9) + "-" + cleaned.slice(9);
    }
    if (cleaned.length > 15) {
        cleaned = cleaned.slice(0, 15); // limita tamanho
    }

    return cleaned;
};