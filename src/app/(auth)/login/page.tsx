"use client";
import AuthForm from "@/components/Form";

export default function Login() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Login</h1>
      <AuthForm formType="login" />
    </div>
  );
}
