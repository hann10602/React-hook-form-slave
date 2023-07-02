"use client";
import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export interface ILoginProps {}

export interface IFormValues {
  fullname: string[]
  email: string;
  channel: string;
  social: {
    twitter: string,
    facebook: string,
  }
  phNumbers: {
    number: string
  }[]
  age: number
  dob: Date
}

export default function Login(props: ILoginProps) {
  const form = useForm<IFormValues>({
    defaultValues: {
      fullname: [
        "Ha",
        "Nguyen"
      ],
      email: "",
      social: {
        facebook: "",
        twitter: ""
      },
      phNumbers: [{ number:"" }],
      age: 0,
      dob: new Date()
    }
  });
  const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control //control in useForm
  })

  const handleGetValues = () => {
    console.log("Values: ", getValues(["age", "channel"]))
  }

  const handleSetValue = () => {
    setValue("social.facebook", "https://www.facebook.com/")
  }

  const watchFullname = watch(["age", "channel"])

  const onSubmit = (data: IFormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="h-screen w-60 m-auto">
      <h1 className="text-4xl font-semibold">Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username" className="block mt-7">
          First name
        </label>
        <input
          className="block text-black"
          type="text"
          id="username"
          {...register("fullname.0", {
            required: "First name is required",
          })}
        />
        <p>{errors.fullname?.[0]?.message}</p>

        <label htmlFor="username" className="block mt-7">
          Last name
        </label>
        <input
          className="block text-black"
          type="text"
          id="username"
          {...register("fullname.1", {
            required: "Last name is required",
          })}
        />
        <p>{errors.fullname?.[1]?.message}</p>

        <label htmlFor="age" className="block mt-7">
          Age
        </label>
        <input
          className="block text-black"
          type="number"
          id="age"
          {...register("age", {
            required: "Age is required"
          })}
        />
        <p>{errors.age?.message}</p>

        <label htmlFor="dob" className="block mt-7">
          Date of birth
        </label>
        <input
          className="block text-black"
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true, //outcome value is Date
            required: "Date of birth is required"
          })}
        />
        <p>{errors.dob?.message}</p>

        <label htmlFor="email" className="block mt-7">
          Email
        </label>
        <input
          className="block text-black"
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

        <label htmlFor="email" className="block mt-7">
          Facebook
        </label>
        <input className="block text-black" type="text" id="facebook" {...register("social.facebook", {
          validate: {
            isLink: (fieldValue) => {
              return (
                fieldValue.startsWith("https://www.facebook.com/") || "This link is invalid"
              );
            }
          }
        })}
        />
        <p className="text-red-500">{errors.social?.facebook?.message}</p>

        <label htmlFor="email" className="block mt-7">
          Twitter
        </label>
        <input className="block text-black" type="text" id="twitter" {...register("social.twitter", {
          validate: {
            isLink: (fieldValue) => {
              return (
                fieldValue.startsWith("https://www.facebook.com/") || "This link is invalid"
              )
            }
          }
        })}
        />
        <p className="text-red-500">{errors.social?.facebook?.message}</p>

        <label htmlFor="channel" className="block mt-7">
          Channel
        </label>
        <input
          className="block text-black"
          type="text"
          id="channel"
          {...register("channel")}
        />
        <p>{errors.channel?.message}</p>

        <div>
          <label>List of phone numbers</label>
          <div>
            {
              fields.map((field, i) => {return (
                <div className="form-control text-black" key={field.id}>
                  <input type="text" {...register(`phNumbers.${i}.number` as const)}/>
                  {
                    i > 0 && <button className="text-white" type="button" onClick={() => remove(i)}>Remove</button>
                  }
                </div>
              )})
            }
            <button type="button" onClick={() => append({number: ""})}>Add phone number</button>
          </div>

        </div>

        <button className="w-32 h-10 bg-green-400 mt-7">submit</button>
        <button className="w-32 h-10 bg-sky-400 mt-7" onClick={handleGetValues}>Get values</button>
        <button className="w-32 h-10 bg-red-400 mt-7" onClick={handleSetValue}>Set value</button>

      </form>
      <DevTool control={control} />
    </div>
  );
}

