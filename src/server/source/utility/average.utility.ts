export const average = (arr: number[]): number => {
    if (arr.length === 0) {
        return 0;
    }

    return (
        arr.reduce((acc: number, num: number): number => {
            return acc + num;
        }, 0) / arr.length
    );
};
