function isNameInList(name, list) {
  return list.find((item) => item.name.toLowerCase().trim() === name.toLowerCase().trim());
}

export default isNameInList;
