export const handleSearchClick = (searchText, data, update) => {
  const lowerCaseSearchText = searchText.toLowerCase();

  const filteredResults = data.filter((item) => {
    return Object.keys(item).some((key) => {
      const value = item[key]?.toString().toLowerCase();
      return value.includes(lowerCaseSearchText);
    });
  });

  update(filteredResults);
};

export const capitalizeFirstLetter = (text) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
