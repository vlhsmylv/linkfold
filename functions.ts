let usedColors: string[] = [];

const colors = [
  "#87CEEB",
  "#90EE90",
  "#F4D738",
  "#FFB2EF",
  "#A7DBD8",
  "#BAFCA2",
  "#FFDB58",
  "#FFA07A",
  "#FFC0CB",
  "#C4A1FF",
  "#F8D6B3",
  "#DAf5F0",
];

export const randomColorPicker = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  usedColors.push(randomColor);
  const usedTwoTimes =
    usedColors.filter((usedColor) => usedColor === randomColor).length > 1;
  if (!usedTwoTimes) {
    return randomColor;
  } else {
    const useableColors = colors.filter((color) => !usedColors.includes(color));
    const randomIndexForUseableColor = Math.floor(
      Math.random() * useableColors.length
    );
    const randomUseableColor = useableColors[randomIndexForUseableColor];
    return randomUseableColor;
  }
};
