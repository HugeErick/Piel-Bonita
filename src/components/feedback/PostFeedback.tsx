"use client"

import { useCustomToasts } from "@/hooks/use-custom-toast";
import { CreateFeedbackPayload } from "@/lib/validators/feedback";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

const PostFeedback = () => {
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToasts();

  const { mutate: getUserFeedbackPost, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateFeedbackPayload = {
        content: input,
      };
      const { data } = await axios.post("/api/post/feedback", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid input",
            description: "Max characters 200",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "something went wrong",
        description: "Could not process, try refreshing the page",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Posted!",
        variant: "default",
      });
    },
  });

  return (
    <div className="my-4 flex flex-col gap-4">
      <Textarea
        placeholder="Give me some feedback :D"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="rounded-[2vh]"
        type="submit"
        isLoading={isLoading}
        disabled={input.length === 0}
        onClick={(e) => {
          e.preventDefault();
          getUserFeedbackPost();
        }}
      >
        Submit
      </Button>
      {/* @ts-expect-error Server Component
      <Feedback />; */}
    </div>
  );
};

export default PostFeedback;