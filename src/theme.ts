import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    // or better, generate manually upfront https://mantine.dev/colors-generator/
    brand: generateColors("#777c91"),
  },
  primaryColor: "brand",
  defaultRadius: "md",
});

export { theme };
