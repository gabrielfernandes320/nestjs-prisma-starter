export default function formatMask(
    text: string,
    mask: string,
): number | string {
    if (text === undefined) {
        return text;
    }

    let aux;
    let pos = 0;
    let newValue = '';
    let maskLength = text.length;

    for (let i = 0; i <= maskLength; i++) {
        aux = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === '/'));
        aux = aux || ((mask.charAt(i) === '(') || (mask.charAt(i) === ')') || (mask.charAt(i) === ' '));

        if (aux) {
            newValue += mask.charAt(i);
            maskLength++;
        } else {
            newValue += text.charAt(pos);
            pos++;
        }
    }

    return newValue;
}
