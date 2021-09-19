export function removeDuplicates(arr: any[]): any[] {
    return arr?.filter(
        (thing, index, self) =>
            self.findIndex(
                (t) => t.place === thing.place && t.name === thing.name
            ) === index
    );
}
