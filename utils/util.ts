const dateTosecond = 86400000;

const dateToUNIXDate = (date: Date): number => {
    const UNIXTime = date.getTime();
    const UNIXDate = Math.floor(UNIXTime / dateTosecond);
    return UNIXDate;
}

const UNIXDateToYYYYMMDD = (UNIXDate: number): string => {
    const date = new Date(UNIXDate * dateTosecond);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
}

export {dateToUNIXDate, UNIXDateToYYYYMMDD};
