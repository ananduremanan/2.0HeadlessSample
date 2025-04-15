/**
 * Generates a random Tailwind color scheme for your application
 * @returns {Object} Object containing bgPrimary, textPrimary, and textColor values
 */
export const randomColorGenerator = () => {
  // Expanded color palette with Tailwind color options
  const tailwindColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ];

  // Color strength options available in Tailwind
  const strengthLevels = [500, 600, 700, 800, 900];

  // Generate random color and strength
  const randomColor =
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  const randomStrength =
    strengthLevels[Math.floor(Math.random() * strengthLevels.length)];

  // Set primary background
  const bgPrimary = `bg-${randomColor}-${randomStrength}`;

  // Determine if we need light or dark text based on background brightness
  let textColor;
  if (randomStrength >= 500) {
    textColor = "white";
  } else {
    textColor = "black";
  }

  // Set primary text color based on contrast needs
  const textPrimary = textColor === "white" ? "text-white" : "text-gray-900";

  console.log(
    `Generated color scheme: ${bgPrimary}, ${textPrimary}, text color: ${textColor}`
  );

  // Return the values to be used in the component
  return {
    bgPrimary,
    textPrimary,
    textColor,
  };
};
