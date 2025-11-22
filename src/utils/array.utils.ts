

export const shuffleArray = () => {

    let arr: number[] = [];
    for (let i = 1; i < 17; i++) {
        arr.push(i > 8 ? i - 8 : i);
    }
    arr.sort(() => Math.random() - Math.random());
    return arr;

}