function isNameInList(name, list) {
    return list.find((item) => item.name.toLowerCase() === name.toLowerCase());
}

function isNumberInList(number, list) {
    return list.find((item) => item.phoneNumber === number);
}

export { isNameInList, isNumberInList };
