"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import NavLink from "./NavLink";

export default function AuthMethodDropdown() {

  const [authMethod, setAuthMethod] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthMethod(e.target.value);
    setCookie('auth-method', e.target.value);
  };

  return (
    <nav className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <select
            value={authMethod}
            onChange={handleChange}
            className="bg-gray-800 text-white text-sm rounded px-3 py-1 border border-gray-600 focus:outline-none focus:border-blue-500"
        >
            <option value="">Choose auth method</option>
            <option value="regular">Email/Password</option>
            <option value="tmdb">TMDB Account</option>
        </select>

        {authMethod === "regular" && (
            <div className="flex gap-2">
            <NavLink label="Register" href="/register" />
            <NavLink label="Login" href="/login" />
            </div>
        )}

        {authMethod === "tmdb" && (
            <NavLink label="Login with TMDB" href="/tmdb" />
        )}
      </div>
    </nav>
  );
}
