function isNameInList(name, list) {
    return list.find((item) => item.name.toLowerCase() === name.toLowerCase());
}

function isNumberInList(number, list) {
    const removeSpecialChars = (numberString) => numberString.replace(/[^0-9]/g, "");
    return list.find((item) => removeSpecialChars(item.number) === removeSpecialChars(number));
}

export { isNameInList, isNumberInList };
