function isNameInList(name, list) {
    return list.find((item) => item.name.toLowerCase() === name.toLowerCase());
}

function isNumberInList(number, list) {
    return list.find((item) => Number(item.phoneNumber) === Number(number));
}

export { isNameInList, isNumberInList };
