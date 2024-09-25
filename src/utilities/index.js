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

export const transformSampleData = (data) => {
  return data.map((candidate) => ({
    ...candidate,
    skills: candidate.skills
      .split(",")
      .map((skill) => skill.trim().toLowerCase()),
  }));
};

export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

export const transformPhoneNumber = (value) => {
  // Remove all spaces from the input
  const digitsOnly = value.replace(/\s+/g, "");

  // Ensure we only reformat if we have exactly 10 digits
  if (digitsOnly.length !== 10) {
    return value; // Return the original input if it's not exactly 10 digits
  }

  // Format the string as xxx xxx xxxx
  return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(
    3,
    6
  )} ${digitsOnly.slice(6)}`;
};

export const transformExperience = (value) => {
  // Ensure the value is a number
  const num = Number(value);

  // Check if the number is valid
  if (value === "" || isNaN(num)) {
    return ""; // or handle invalid number cases as needed
  }

  return Math.round(num);
};
