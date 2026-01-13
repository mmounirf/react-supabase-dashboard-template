import { Button, Chip } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button variant="outline">button</Button>
      <Button variant="light">button</Button>
      <Chip defaultChecked>Awesome chip</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="light">Light</Chip>
    </div>
  );
}
