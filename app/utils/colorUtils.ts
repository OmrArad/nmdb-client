export const getGradientColor = (
  count: number,
  minCount: number,
  maxCount: number
): string => {
  const ratio = (maxCount - count) / (maxCount - minCount); // Normalize the count between 0 and 1

  let r, g, b;

  if (ratio <= 0.5) {
    const greenToYellowRatio = ratio * 2;
    r = Math.round(250 * greenToYellowRatio);
    g = 190;
    b = 0;
  } else {
    const yellowToRedRatio = (ratio - 0.5) * 2;
    r = 230;
    g = Math.round(250 * (1 - yellowToRedRatio));
    b = 0;
  }

  return `rgb(${r},${g},${b})`;
};
