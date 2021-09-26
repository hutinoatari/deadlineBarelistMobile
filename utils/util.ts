const rand = (n: number): number => Math.floor(Math.random() * n);
const chooseOne = <T>(a: T[]): T => a[rand(a.length)];

const UNIXTimeToYYYYMMDD = (UNIXTime: number): string => {
    const date = new Date(UNIXTime);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
}

const charList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const generateRandomString = (): string => {
    const randomString = [...Array(32)].map(() => chooseOne(charList)).join("");
    return randomString;
}

const dayString = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

export { UNIXTimeToYYYYMMDD, generateRandomString, dayString };
