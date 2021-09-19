export function formatCurrency(str: any) {
    return str?.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
}
