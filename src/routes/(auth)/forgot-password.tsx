import { Link, createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { EnvelopeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Field, FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import AnimatedFieldError from "@/components/ui/animated-field-error";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: RouteComponent,
});

const loginFormSchema = z.object({
  email: z.email(),
});

function RouteComponent() {
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-balance text-muted-foreground">
          Provide your email and request a password reset email
        </p>

        <p className="text-balance text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            className="underline text-sm underline-offset-2! ms-auto hover:text-primary"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          forgotPasswordForm.handleSubmit();
        }}
      >
        <FieldGroup className="gap-6">
          <forgotPasswordForm.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      autoComplete="email"
                      type="email"
                      placeholder="Enter your email address"
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <InputGroupAddon>
                      <EnvelopeIcon />
                    </InputGroupAddon>
                  </InputGroup>

                  <AnimatedFieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </forgotPasswordForm.Field>

          <Button type="submit">Password reset</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
