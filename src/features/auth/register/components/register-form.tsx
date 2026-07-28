// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '../lib/schema/register.schema';

export default function RegisterForm() {
  // const form = useForm<RegisterFormValue>{
  //     resolver: zodResolver(registerSchema),
  //     defaultValues: {
  //         email: "",
  //       },
  // }

  return (
    <form className="pt-6 pb-9 border-t border-b border-ds-border-muted">
      {/* <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
    </form>
  );
}
