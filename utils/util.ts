const rand = (n: number): number => Math.floor(Math.random() * n);

const UNIXTimeToYYYYMMDD = (UNIXTime: number): string => {
    const date = new Date(UNIXTime);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
}

const generateRandomString = (): string => {
    const charList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const randomString = new Array(32).fill(undefined).map(() => charList[rand(charList.length)]).join("");
    return randomString;
}

export { UNIXTimeToYYYYMMDD, generateRandomString };
