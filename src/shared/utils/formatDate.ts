export default function formatDate(value: string) {
    if (!value) {
        return;
    }

    let new_date = '';

    let nArr = value.split('T');
    let nDate = '';

    if (nArr.length > 1) {
        nDate = nArr[0];
    } else {
        nDate = value;
    }

    new_date = `${nDate.split('-')[2]}/${nDate.split('-')[1]}/${
        nDate.split('-')[0]
    }`;

    return new_date;
}
