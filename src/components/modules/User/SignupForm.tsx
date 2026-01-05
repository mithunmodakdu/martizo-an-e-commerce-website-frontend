import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { email, z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "@/components/ui/PasswordInput";
import { useRegisterMutation } from "@/redux/features/users/users.api";
import { toast } from "sonner";

export const SignupUserZodSchema = z.object({
  name: z.string({message: "Name must be string"})
    .min(2, {message: "Name is too short. It must have minimum 2 characters.",})
    .max(50, {message: "Name is too long. It must have maximum 50 characters."}),
  email: z.email(),
  password: z.string({message: "Password must be string"})
    .min(8, { message: "Password must have at least 8 characters."})
    .regex(/^(?=.*[A-Z])/, {message: "Password must have at least one uppercase letter"})
    .regex(/^(?=.*[@#$%!*])/, {message: "Password must have at least one special character"})
    .regex(/^(?=.*\d)/, { message: "Password must have at least one digit" }),
  confirmPassword: z.string({message: "Password must be string"})
    .min(8, { message: "Password must have at least 8 characters."})
    .regex(/^(?=.*[A-Z])/, {message: "Password must have at least one uppercase letter"})
    .regex(/^(?=.*[@#$%!*])/, {message: "Password must have at least one special character"})
    .regex(/^(?=.*\d)/, { message: "Password must have at least one digit" }),
  phone: z.string({ message: "Phone number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh.   Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z.string({message: "Address must be string" })
    .max(200, { message: "Address can not exceed 200 characters"})
    .optional()
   
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match.",
  path: ["confirmPassword"]
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof SignupUserZodSchema>>({
    resolver: zodResolver(SignupUserZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
   
  });

  const onSubmit = async(data: z.infer<typeof SignupUserZodSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    try {
      const result = await register(userInfo).unwrap();
      console.log(result)
      // toast.success("Your account created successfully.")
      // toast.success(`${result.message}`)
      toast.success(result.message)

    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-1 text-center mb-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in the form below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mithun Modak" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is for your name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mithunmodakdu@gmail.com" type="email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is for your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field}/>
                </FormControl>
                <FormDescription className="sr-only">
                  This is for your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field}/>
                </FormControl>
                <FormDescription className="sr-only">
                  This is for Confirm Password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </Form>

      
      <FieldSeparator className="my-5">Or continue with</FieldSeparator>

      <Field>
        <Button variant="outline" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Sign up with GitHub
        </Button>
        <FieldDescription className="px-6 text-center">
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </FieldDescription>
      </Field>
    </div>
  );
}
