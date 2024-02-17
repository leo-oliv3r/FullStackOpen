function isNameInList(name, list) {
  return list.find((item) => item.name.toLowerCase().trim() === name.toLowerCase().trim());
}

function isNumberInList(number, list) {
  const removeSpecialChars = (numberString) => numberString.replace(/[^0-9]/g, "");
  return list.find(
    (item) => removeSpecialChars(item.number).trim() === removeSpecialChars(number).trim()
  );
}

export { isNameInList, isNumberInList };
