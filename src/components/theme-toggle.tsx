import { Button, type MantineColorScheme, useMantineColorScheme } from "@mantine/core";

export function ThemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const handleThemeToggle = (theme: MantineColorScheme) => {
    setColorScheme(theme);
  };
  return (
    <>
      <Button disabled={colorScheme === "dark"} onClick={() => handleThemeToggle("dark")}>
        Dark
      </Button>
      <Button disabled={colorScheme === "light"} onClick={() => handleThemeToggle("light")}>
        Light
      </Button>
      <Button disabled={colorScheme === "auto"} onClick={() => handleThemeToggle("auto")}>
        Auto
      </Button>
    </>
  );
}
