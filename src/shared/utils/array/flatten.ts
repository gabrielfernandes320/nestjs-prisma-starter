export function flatten(arr: ReadonlyArray<any[]>): any[] {
    return arr?.reduce((accumulator, value) => accumulator.concat(value), []);
}
