"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { ActionState } from "@/types";

function toArray(error: string | string[] | undefined): string[] {
  if (!error) return [];
  return Array.isArray(error) ? error : [error];
}

export async function register(state: ActionState, formData: FormData) {
  const useremail = formData.get("email")?.toString();
  const validatedFields = RegisterFormSchema.safeParse({
    email: useremail,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        email: toArray(validatedFields.error.flatten().fieldErrors.email),
      },
      email: useremail,
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: ["Server error!"] } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: ["Email already exists in our database!"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10); // salt

  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  await createSession(results.insertedId.toString()); // because insertedId is a type of objectId
  redirect("/");
}

export async function login(state: ActionState, formData: FormData) {
  const useremail = formData.get("email");
  const emailString = typeof useremail === "string" ? useremail : "";
  const validatedFields = LoginFormSchema.safeParse({
    email: emailString,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        email: toArray(validatedFields.error.flatten().fieldErrors.email),
      },
      email: emailString,
    };
  }
  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: ["Server error!"] } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: ["Invalid credentials."] } };

  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { email: ["Invalid credentials."] } };

  await createSession(existingUser._id.toString());
  redirect("/dashboard");
}

export async function regAuthLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}

export async function tmdbLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("user-account-data");
  redirect("/");
}
