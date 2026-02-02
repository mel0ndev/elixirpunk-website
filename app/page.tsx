"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll keep you updated.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a1422] to-[#140f19] px-4">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[120px] leading-none tracking-wide text-[#E0B77E] sm:text-[150px]">
            Elixir Punk
          </h1>
          <p className="text-[45px] leading-tight text-[#E0B77E]/70">
            You&apos;re early. I like that.
          </p>
          <p className="text-[45px] leading-tight text-[#E0B77E]/70">
            Sign up to receive updates about the game.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-3xl gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            className="flex-1 border-4 border-[#E0B77E]/50 bg-transparent px-6 py-4 text-[40px] text-[#E0B77E] placeholder-[#E0B77E]/40 focus:border-[#E0B77E] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="border-4 border-[#E0B77E] bg-transparent px-10 py-4 text-[40px] text-[#E0B77E] transition-colors hover:bg-[#E0B77E]/10 focus:outline-none disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            className={`text-[35px] ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Image gallery */}
        <div className="mt-8 flex gap-8">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`/ss${i}.png`}
              alt={`Screenshot ${i}`}
              className="h-auto w-80 border-4 border-white opacity-50 transition-all duration-300 ease-out hover:scale-110 hover:opacity-100"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
