import { Link, createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import AnimatedFieldError from "@/components/ui/animated-field-error";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

const registerFormSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: "Password is required" }),
});

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-sm underline-offset-2! ms-auto hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
      <GoogleAuthButton>Continue with Google</GoogleAuthButton>
      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        or
      </FieldSeparator>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          registerForm.handleSubmit();
        }}
      >
        <FieldGroup className="gap-6">
          <registerForm.Field name="email">
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
          </registerForm.Field>
          <registerForm.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setShowPassword(
                            (showPasswordValue) => !showPasswordValue,
                          )
                        }
                      >
                        {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <AnimatedFieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </registerForm.Field>

          <Button type="submit">Create account</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
