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


export const isBeforeToday = (date?: Date) => {
    if (!date) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const normalizedDate = date instanceof Date ? date : new Date(date);
    const compare = new Date(normalizedDate);
    compare.setHours(0, 0, 0, 0);

    return compare < today;


}


export const isOneMonthFromToday = (date?: Date) => {
    if (!date) {
        return false;
    }

    const today = new Date();

    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const normalizedDate = date instanceof Date ? date : new Date(date);

    const compare = new Date(normalizedDate);

    if (today < compare && compare < nextMonth) {
        return true
    }

    return false


}