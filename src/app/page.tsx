"use client";

import { useState } from "react";

// Pain point cards data
const painPoints = [
  {
    title: "Terrible text editing in terminals",
    description:
      "Editing long prompts in a terminal is slow and frustrating. Deleting, rewriting, and navigating text feels clumsy compared to the WYSIWYG editors I'm used to. Terminals simply aren't built for writing.",
  },
  {
    title: "No spellcheck in the terminal",
    description:
      "I'm dyslexic, and spelling gets worse when I'm typing long prompts fast. I often realise too late that my prompt barely makes sense. Claude usually figures it out but I'd rather send clear, accurate prompts in the first place.",
  },
  {
    title: "Claude context uncertainty",
    description:
      "I'm often unsure what I've shared with Claude and when. Is it following the PRD, or just making it up as it goes along? In Vibey, any page can be shared with a clear date and time stamp and if you terminate the session or run /clear, the status turns red as a warning.",
  },
  {
    title: "Prompt drafting feels rushed and error-prone",
    description:
      "I often start drafting my next prompt while Claude is still working. If something changes, there's no easy way to clear or rewrite text. Vibey lets you draft prompts properly, then send them with one click when both you and Claude are ready.",
  },
  {
    title: "Speech to text is unreliable",
    description:
      "On macOS, double-tap Control dictation helps, but it's pretty ropey. It often gets words wrong, which isn't great when you're dictating long prompts. Vibey is designed to support better, more reliable dictation built specifically for writing prompts.",
  },
  {
    title: "Mental overhead tracking usage limits",
    description:
      "While it's not possible to track usage limits in real time reliably, Vibey keeps the latest usage limit messages pinned in the terminal. This makes it easier to stay aware of your usage without breaking focus.",
  },
  {
    title: "Eye strain from terminal contrast",
    description:
      "High contrast terminals with pure black backgrounds and bright white text make eye strain worse. There are far more readable typefaces out there, like Atkinson Hyperlegible, but terminals don't prioritise this.",
  },
  {
    title: "Fragmented workflow",
    description:
      "Claude works best with clear designs and detailed context. Before Vibey, my workflow was scattered across Coda, Google Docs, markdown files, and Figma links — constantly copying, pasting, and jumping between windows.",
  },
];

// Logo component
function VibeyLogo() {
  return (
    <img
      src="/vibeycodeslogo.png"
      alt="Vibey.codes"
      className="h-8"
    />
  );
}

// Apple logo icon
function AppleLogo() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
      <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.372-1.683-.372-.537 0-1.113.123-1.73.372-.618.25-1.117.381-1.496.393-.579.025-1.155-.229-1.729-.764-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.347 1.838-1.038 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.022-.36c0-.913.396-1.889 1.1-2.688.352-.404.8-.74 1.342-1.005.542-.261 1.054-.406 1.536-.436.013.127.023.253.023.378z" />
    </svg>
  );
}

// Windows logo icon
function WindowsLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M0 2.857L8.182 1.675v7.873H0V2.857zm0 14.286l8.182 1.182V10.452H0v6.691zm9.091 1.311L20 20V10.452H9.091v8.002zm0-15.597v7.691H20V0L9.091 2.857z" />
    </svg>
  );
}

// Arrow icons for carousel
function ArrowLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<"monthly" | "yearly" | null>(null);
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [portalEmail, setPortalEmail] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState("");
  const visibleCards = 3;
  const maxIndex = Math.max(0, painPoints.length - visibleCards);

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

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

  const handlePortal = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortalLoading(true);
    setPortalError("");

    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: portalEmail }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setPortalError(data.error || "No subscription found for this email");
      }
    } catch {
      setPortalError("Something went wrong. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121418] overflow-x-hidden">
      {/* Manage Subscription Modal */}
      {showPortalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1c1e22] border border-[#242529] rounded-2xl p-8 w-full max-w-md mx-4">
            <h3 className="font-[family-name:var(--font-lexend)] font-bold text-xl text-white mb-2">
              Manage Subscription
            </h3>
            <p className="text-[#d0d0d1]/60 mb-6">
              Enter the email you used to subscribe.
            </p>
            <form onSubmit={handlePortal}>
              <input
                type="email"
                value={portalEmail}
                onChange={(e) => setPortalEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#121418] border border-[#242529] rounded-lg px-4 py-3 text-white placeholder-[#d0d0d1]/40 mb-4 focus:outline-none focus:border-[#0459fe]"
                required
              />
              {portalError && (
                <p className="text-red-400 text-sm mb-4">{portalError}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPortalModal(false);
                    setPortalEmail("");
                    setPortalError("");
                  }}
                  className="flex-1 py-3 rounded-lg border border-[#242529] text-[#d0d0d1] hover:bg-[#242529] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={portalLoading}
                  className="flex-1 bg-[#0459fe] text-white py-3 rounded-lg hover:bg-[#0349d4] transition-colors disabled:opacity-50"
                >
                  {portalLoading ? "Loading..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Background gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#0459fe]/20 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 max-w-[1280px] mx-auto backdrop-blur-sm">
        <VibeyLogo />
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowPortalModal(true)}
            className="font-[family-name:var(--font-atkinson)] text-[#d0d0d1] hover:text-white transition-colors"
          >
            Manage Subscription
          </button>
          <a
            href="/Vibey.code.zip"
            download
            className="flex items-center gap-2 bg-[#0459fe] text-white px-6 py-3 rounded hover:bg-[#0349d4] transition-colors"
          >
            <AppleLogo />
            <span className="font-[family-name:var(--font-atkinson)] tracking-wide">Download</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-8 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Headline */}
          <div>
            <h1 className="text-5xl lg:text-6xl leading-tight">
              <span className="font-[family-name:var(--font-garamond)] font-extrabold text-[#da7757]">
                Claude Code
              </span>
              <br />
              <span className="font-[family-name:var(--font-lexend)] font-bold text-[#ebecf0]">
                Without The Pain
              </span>
              <br />
              <span className="font-[family-name:var(--font-lexend)] font-bold text-[#ebecf0]">
                Of The{" "}
              </span>
              <span className="font-[family-name:var(--font-story)] text-[#da7757] italic">
                Terminal
              </span>
            </h1>
            <p className="font-[family-name:var(--font-atkinson)] text-[#d0d0d1]/60 text-xl mt-6">
              Download and try the app for free
            </p>
          </div>

          {/* Right - App Screenshots */}
          <div className="relative h-[400px] lg:h-[520px]">
            {/* Placeholder for app screenshots */}
            <div className="absolute right-0 top-0 w-[350px] h-[420px] bg-[#1c1e22] rounded-lg border border-[#242529] shadow-2xl overflow-hidden">
              <div className="h-8 bg-[#1a1b1f] flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="p-4 font-mono text-sm text-[#d0d0d1]">
                <p className="text-[#0459fe]">$ claude</p>
                <p className="mt-2 text-[#d0d0d1]/60">Claude Code v1.0</p>
                <p className="mt-4">Ready for prompts...</p>
              </div>
            </div>
            <div className="absolute left-0 bottom-0 w-[500px] h-[350px] bg-[#1c1e22] rounded-lg border border-[#242529] shadow-2xl overflow-hidden">
              <div className="h-8 bg-[#1a1b1f] flex items-center justify-between px-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-[#d0d0d1]/40">Product Requirements (PRD)</span>
              </div>
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-lexend)] font-bold text-[#ebecf0] mb-3">
                  Product Requirements
                </h3>
                <div className="space-y-2 text-sm text-[#d0d0d1]/70">
                  <p>1. Project Goals</p>
                  <p>2. Target Audience</p>
                  <p>3. Feature Backlog</p>
                  <p>4. Technical Specs</p>
                </div>
              </div>
            </div>
            {/* Decorative arrow */}
            <div className="absolute right-[60px] top-[240px] text-[#0459fe]">
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                <path
                  d="M10 10 Q30 40, 50 70"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M45 60 L50 70 L40 68" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Photo and Name */}
          <div>
            <h2 className="font-[family-name:var(--font-lexend)] font-bold text-5xl text-[#ebecf0] mb-6">
              About Me
            </h2>
            <div className="w-44 h-44 rounded-full bg-[#242529] mb-6 overflow-hidden">
              {/* Placeholder for profile photo */}
              <div className="w-full h-full bg-gradient-to-br from-[#0459fe]/30 to-[#da7757]/30" />
            </div>
            <h3 className="font-[family-name:var(--font-lexend)] font-medium text-3xl text-[#d0d0d1]">
              Will Fuller
            </h3>
            <p className="font-[family-name:var(--font-lexend)] font-light text-xl text-[#d0d0d1]">
              Founder Designer & Vibe Coder
            </p>
          </div>

          {/* Right - Story */}
          <div className="font-[family-name:var(--font-atkinson)] text-[#d0d0d1] leading-relaxed space-y-4">
            <p>I built Vibey to move faster on my side projects.</p>
            <p>
              Claude Code massively expanded what I can build as a designer but working in a
              terminal never felt natural to me. Editing long prompts is painful. There&apos;s no
              spellcheck. No proper dictation.
            </p>
            <p>So I built Vibey!</p>
            <p>
              Vibey brings everything I need into one place.
              <br />
              Plans, PRDs, notes, feature backlogs and draft prompts all together, ready to send
              to Claude Code with a single click.
            </p>
            <p>
              Before Vibey, my workflow was scattered across Coda, Google Docs, markdown files,
              and Figma links, constantly copying, pasting, and jumping from window to window.
              Now I can plan, write, and prompt without fighting the terminal.
            </p>
            <p className="font-bold text-[#ebecf0]">
              The terminal is a terrible WYSIWYG.
              <br />
              Vibey fixes that.
            </p>
          </div>
        </div>
      </section>

      {/* Background gradient for Why section */}
      <div className="absolute top-[1400px] left-1/2 -translate-x-1/2 w-[1400px] h-[800px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#0459fe]/20 via-transparent to-transparent" />
      </div>

      {/* Why Am I Building Vibey Section */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-8 py-24">
        <h2 className="font-[family-name:var(--font-lexend)] font-bold text-5xl text-center text-[#ebecf0] mb-16">
          Why Am I Building Vibey
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${carouselIndex * (450 + 20)}px)` }}
            >
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex-none w-[450px] h-[302px] bg-[#1c1e22] border border-[#242529] rounded-2xl p-8 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-lexend)] font-bold text-xl text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="font-[family-name:var(--font-atkinson)] text-[#d0d0d1]/60 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={carouselIndex === 0}
              className="p-5 bg-[#242529] border border-[#242529] rounded-2xl text-white disabled:opacity-30 hover:bg-[#2a2b30] transition-colors"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={carouselIndex === maxIndex}
              className="p-5 bg-[#242529] border border-[#242529] rounded-2xl text-white disabled:opacity-30 hover:bg-[#2a2b30] transition-colors"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Price Plans Section */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-8 py-24">
        <h2 className="font-[family-name:var(--font-lexend)] font-bold text-5xl text-center text-white mb-4">
          Price Plans
        </h2>
        <p className="text-center text-[#d0d0d1] max-w-xl mx-auto mb-12">
          Subscribe to a plan that works for you. Cancel anytime.{" "}
          <span className="font-bold text-white">Join the waitlist to receive 20% off.</span>{" "}
          Pricing plans may change, pricing will be finalised once the app is completed.
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
                £5.99
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
                £39.99
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
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1280px] mx-auto px-8 py-12 border-t border-[#242529]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <VibeyLogo />
          <p className="text-[#d0d0d1]/60 text-sm">
            © 2026 Vibey.code. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
