"use client";
import AuthForm from "@/components/Form";

export default function Register() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <AuthForm formType="register" />
    </div>
  );
}
