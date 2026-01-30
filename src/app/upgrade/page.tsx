"use client";

import { useState } from "react";
import Link from "next/link";

// Logo component
function VibeyLogo() {
  return (
    <img
      src="/vibeylogo.png"
      alt="Vibey.codes"
      className="h-8"
    />
  );
}

export default function UpgradePage() {
  const [isLoading, setIsLoading] = useState<"monthly" | "yearly" | null>(null);

  const handleCheckout = async (plan: "monthly" | "yearly") => {
    setIsLoading(plan);
    try {
      const priceId =
        plan === "monthly"
          ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#121418] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 max-w-[1280px] mx-auto w-full">
        <Link href="/">
          <VibeyLogo />
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-[750px] w-full">
          <h1 className="font-[family-name:var(--font-lexend)] font-bold text-4xl text-center text-white mb-3">
            Upgrade to Vibey
          </h1>
          <p className="text-center text-[#d0d0d1] mb-10">
            Choose a plan that works for you. Cancel anytime. Vibey is still in early development with more features on the way. To thank our first users, use code{" "}
            <span className="inline-flex items-center gap-1">
              <span className="font-bold text-white">EARLYADOPTER20</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("EARLYADOPTER20");
                }}
                className="p-1 hover:bg-[#242529] rounded transition-colors"
                title="Copy code"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#d0d0d1]">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </span>
            {" "}at checkout for 20% off.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Monthly Plan */}
            <div className="w-full md:w-[353px] bg-[#1c1e22] border border-[#242529] rounded-2xl p-5">
              <div className="mb-2">
                <h3 className="font-[family-name:var(--font-lexend)] font-bold text-xl text-white">
                  Monthly
                </h3>
                <p className="font-[family-name:var(--font-lexend)] font-light text-[#d0d0d1]">
                  Cancel anytime.
                </p>
              </div>
              <p className="text-white">
                <span className="font-[family-name:var(--font-atkinson)] font-bold text-4xl">
                  $7.99
                </span>
                <span className="font-[family-name:var(--font-atkinson)] text-xl">/mo</span>
              </p>
              <button
                onClick={() => handleCheckout("monthly")}
                disabled={isLoading !== null}
                className="mt-4 w-full bg-[#0459fe] text-white py-3 rounded-lg font-[family-name:var(--font-atkinson)] hover:bg-[#0349d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === "monthly" ? "Loading..." : "Subscribe Monthly"}
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="w-full md:w-[353px] bg-[#1c1e22] border border-[#242529] rounded-2xl p-5">
              <div className="mb-2">
                <h3 className="font-[family-name:var(--font-lexend)] font-bold text-xl text-white">
                  Yearly
                </h3>
                <p className="font-[family-name:var(--font-lexend)] font-light text-[#d0d0d1]">
                  Cancel anytime.
                </p>
              </div>
              <p className="text-white">
                <span className="font-[family-name:var(--font-atkinson)] font-bold text-4xl">
                  $49.99
                </span>
                <span className="font-[family-name:var(--font-atkinson)] text-xl">/yr</span>
              </p>
              <button
                onClick={() => handleCheckout("yearly")}
                disabled={isLoading !== null}
                className="mt-4 w-full bg-[#0459fe] text-white py-3 rounded-lg font-[family-name:var(--font-atkinson)] hover:bg-[#0349d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === "yearly" ? "Loading..." : "Subscribe Yearly"}
              </button>
            </div>
          </div>

          <p className="text-center text-[#d0d0d1]/50 text-sm mt-8">
            Already subscribed? Open Vibey and click{" "}
            <span className="text-[#0459fe]">&quot;Enter License Key&quot;</span>
            {" "}in the sidebar.
          </p>
        </div>
      </main>
    </div>
  );
}
