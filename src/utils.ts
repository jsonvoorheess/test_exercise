export const TranslateDate = (date:string)=> {
    const [day, month, year] = date.split(".");
    const dateObj = new Date(`20${year}-${month}-${day}`)

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'short',
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formattedDate = dateObj.toLocaleDateString("ru-RU", options).slice(-18, -3).split(",").reverse().join(", ")
    return formattedDate
}

export function getCorrectDeclension(number:number, words: string[]) {
    number = Math.abs(number) % 100; // Работаем с положительным числом и смотрим на последние две цифры
    const lastDigit = number % 10;

    if (number > 10 && number < 20) {
        return words[2]; // Склонение для 11-19
    }
    if (lastDigit === 1) {
        return words[0]; // Склонение для 1
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return words[1]; // Склонение для 2-4
    }
    return words[2]; // Склонение для 5-9 или 0
}