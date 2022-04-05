export const getNameCount = (names, search) => {
  const searchTokens = search
    .trim()
    .split(" ")
    .map((s) => s.toLowerCase());
  return names.reduce((acc, person) => {
    const name = person.name.toLowerCase();
    const { type, count } = person;

    searchTokens.forEach((element) => {
      if (!acc[element]) {
        acc[element] = { firstgiven: 0, onlygiven: 0, family: 0 };
      }
      if (element === name) {
        acc[element][type] += count;
      }
    });
    return acc;
  }, {});
};
