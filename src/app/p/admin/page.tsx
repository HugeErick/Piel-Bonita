"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordAdminValidatorPayload } from "@/lib/validators/passwordAdmin";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import BackToHomeBtn from "@/components/BackToHomeBtn";

const Page = () => {
  const router = useRouter();
  const form = useForm();
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToasts();

  const { mutate: getUrlGetAdmin, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: PasswordAdminValidatorPayload = {
        password: input,
      };
      const { data } = await axios.post("/api/admin", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422 || err.response?.status === 403) {
          return toast({
            title: "Invalid input",
            description: "Please leave",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "something went wrong",
        description: "Could not process, try refreshing the page",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/p/${data}`);
    },
  });

  return (
    <div className="min-h-screen m-10 antialiased pt-20 pb-6">
      <BackToHomeBtn />
      <div className="mt-10">
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="Admin-Password"
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[1vh]"
                      value={input}
                      type="password"
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="password"
                    />
                  </FormControl>
                  <FormDescription>Auth to admin panel</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="rounded-[2vh]"
              type="submit"
              isLoading={isLoading}
              disabled={input.length === 0}
              onClick={(e) => {
                e.preventDefault();
                getUrlGetAdmin();
              }}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
