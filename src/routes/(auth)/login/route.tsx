import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().nonempty("Password is required"),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
  validateSearch: (search: Record<string, unknown>) => ({
    redirectTo: typeof search.redirectTo === "string" ? search.redirectTo : undefined,
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.session) {
      throw redirect({
        to: search.redirectTo || "/dashboard",
      });
    }
  },
});

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: FormValues) => {
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
  };

  return (
    <Container py="xl" size="sm">
      <Paper p="xl" radius="md" shadow="md" withBorder>
        <Stack>
          <Title order={2} ta="center">
            Sign In
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                type="email"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />

              {error && (
                <Text c="red" size="sm">
                  {error}
                </Text>
              )}

              <Button fullWidth loading={loading} type="submit">
                Sign In
              </Button>

              <Text size="sm" ta="center">
                <a href="/forgot-password">Forgot Password?</a>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}
