export const dateToString = (date?: Date) => {
    if (!date) {
        return null
    }

    const normalizedDate = date instanceof Date ? date : new Date(date);

    const stringDate = normalizedDate.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });

    return stringDate;
}

export const stringToDate = (text?: string) => {

    if (!text) {
        return null
    }

    const [dia, mes, ano] = text.split("/").map(Number);
    const date = new Date(Date.UTC(ano, mes - 1, dia));
    return date;

}

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