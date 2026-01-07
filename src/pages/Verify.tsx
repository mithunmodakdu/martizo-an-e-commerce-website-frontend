import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/otp/otp.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const otpZodSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 characters.",
  }),
});

export default function Verify({
  ...props
}: React.ComponentProps<typeof Card>) {
  const location = useLocation();
  // console.log(location.state)
  const navigate = useNavigate();
  const [email] = useState(location.state);

  useEffect(() => {
    if(!email){
      navigate("/")
    }
  }, [email, navigate])

  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  const handleConfirm = async () => {
    try {
      const result = await sendOtp({ email: email }).unwrap();

      if (result.success) {
        toast.success("OTP has been sent to your email.");
      }

      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof otpZodSchema>>({
    resolver: zodResolver(otpZodSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: z.infer<typeof otpZodSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <div>
          {confirmed ? (
            <Card {...props}>
              <CardHeader>
                <CardTitle>Enter verification code</CardTitle>
                <CardDescription>
                  We sent a 6-digit code to your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification code</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              id="otp"
                              required
                              {...field}
                            >
                              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Enter the 6-digit code sent to your email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FieldGroup>
                      <Button type="submit">Verify</Button>
                      <FieldDescription className="text-center">
                        Didn&apos;t receive the code? <a href="#">Resend</a>
                      </FieldDescription>
                    </FieldGroup>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card {...props}>
              <CardHeader>
                <CardTitle>Verify your email address</CardTitle>
                <CardDescription>
                  We will send a 6-digit code to your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleConfirm} className="w-full">
                  Confirm
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
