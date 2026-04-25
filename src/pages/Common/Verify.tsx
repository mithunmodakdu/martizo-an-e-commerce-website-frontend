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
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/otp/otp.api";
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
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(12);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  useEffect(() => {
    if(!email){
      navigate("/")
    }
  }, [email, navigate])

  useEffect(() =>{

    if(!email || !confirmed){
      return;
    }

    const timerId = setInterval(() => {
      // if(email && confirmed){
      // }
      setTimer((prev) => (prev > 0? prev - 1 : 0))
      console.log("Tick")

    }, 1000);

    return () => clearInterval(timerId)
  }, [email, confirmed])



  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending OTP...")
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP has been sent to your email.", {id: toastId});
        setConfirmed(true);
        setTimer(12);
      }

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

  const onSubmit = async(data: z.infer<typeof otpZodSchema>) => {
    const verifyOtpInfo = {
      email,
      otp: data.otp
    }
    const toastId = toast.loading("Verifying OTP...")

    try {
      const res = await verifyOtp(verifyOtpInfo).unwrap();

      if(res.success){
        toast.success(res.message, {id: toastId})
      }

      navigate("/login")

    } catch (error) {
      console.log(error)
    }
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
                    id="otp-form"
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
                            Enter the 6-digit code sent to your email. {" "}
                            {`Remaining ${timer} seconds`}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                  <FieldGroup className="pt-5">
                      <Button form="otp-form" type="submit">Verify</Button>
                      <FieldDescription className="text-center">
                        Didn&apos;t receive the code? <Button variant="link" className={cn("px-2 py-1", {"cursor-pointer": timer === 0})}  onClick={handleSendOTP} disabled={timer !== 0} >Resend</Button>
                      </FieldDescription>
                    </FieldGroup>
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
                <Button onClick={handleSendOTP} className="w-full">
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
