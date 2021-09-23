const UNIXTimeToYYYYMMDD = (UNIXTime: number): string => {
    const date = new Date(UNIXTime);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
}

export { UNIXTimeToYYYYMMDD };
