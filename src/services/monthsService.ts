import { Month } from "../models/Month";

export const createMonths = () => {
    let months = [];
    
    const today = new Date()
    const currentYear = today.getFullYear()
    let indexMonth = today.getMonth()
    let yearAgo = new Date(currentYear - 1, indexMonth - 1)
    const indexYear = new Date().getFullYear();
    let indexDate = new Date(currentYear, indexMonth)

    while(indexDate > yearAgo) {
        const newMonth = new Month({
           date: getYearMonth(indexDate),
           incomes: {
            total: 0,
            movements: []
           },
           expenses: {
            total: 0,
            movements: []
           }
        })
        months.push(newMonth)
        indexMonth--;
        indexDate = new Date(indexYear, indexMonth)
    }
    return months;
}

const getYearMonth = (date: Date): string => {
    return date.toISOString().split('T')[0].substring(0,7)
}
