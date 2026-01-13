import { Alert, Button, Code, Container, Flex, Spoiler } from "@mantine/core";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

export function ErrorComponent(props: ErrorComponentProps) {
  return (
    <Container fluid>
      <Alert color="red" title={`${props.error.name} - ${props.error.message}`}>
        <Flex direction="column">
          {props.error.stack?.split(" at ").map((item) => (
            <Code key={item}>{item}</Code>
          ))}
        </Flex>
        <Button onClick={() => props.reset()}>Try again</Button>
      </Alert>

      <ThemeToggle />
    </Container>
  );
}
