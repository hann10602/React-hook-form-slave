"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export interface ILoginProps {}

export interface IFormValues {
  username: string;
  email: string;
  channel: string;
}

export default function Login(props: ILoginProps) {
  const form = useForm<IFormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: IFormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="h-screen w-60 m-auto">
      <h1 className="text-4xl font-semibold">Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username" className="block mt-7">
          Username
        </label>
        <input
          className="block"
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <p>{errors.username?.message}</p>

        <label htmlFor="email" className="block mt-7">
          Email
        </label>
        <input
          className="block"
          type="text"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
                notAdmin: (fieldValue) => {
                    return (
                        fieldValue != "admin@example.com" || "Enter a different email"
                    );
                },
                BlackListed: (fieldValue) => {
                    return (
                        !fieldValue.endsWith("@baddomain.com") || "This domain is not supported"
                    )
                }
            }
          })}
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <label htmlFor="channel" className="block mt-7">
          Channel
        </label>
        <input
          className="block"
          type="text"
          id="channel"
          {...register("channel")}
        />
        <p>{errors.channel?.message}</p>

        <button className="w-32 h-10 bg-green-400 mt-7">submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
