import { Button, Container, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <Title>React + Supbase</Title>
      <Text>Dashboard Template</Text>
    </Container>
  );
}
