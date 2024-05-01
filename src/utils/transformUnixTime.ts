interface IDate {
    minutes: number | string
    hours: number | string
    day: number | string
    month: number | string
    year: number | string
}

export function transformUnixTime(unixTime: number): IDate {
    const date = new Date(unixTime * 1000);

    const transformDate: IDate = {
        minutes: date.getMinutes(),
        hours: date.getHours(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };

    return templateForDate(transformDate);
}

function templateForDate(date: IDate): IDate {
    let key: keyof IDate;

    for(key in date) {
        date[key] = String(date[key]).padStart(2, '0');
    }
    
    return date;
}