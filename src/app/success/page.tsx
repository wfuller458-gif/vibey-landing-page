import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#121418] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1c1e22] border border-[#242529] rounded-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-[family-name:var(--font-lexend)] font-bold text-2xl text-white mb-4">
          Welcome to Vibey!
        </h1>

        <p className="text-[#d0d0d1] mb-6">
          Thank you for subscribing! Check your email for your license key.
          You&apos;ll receive it within the next few minutes.
        </p>

        <div className="bg-[#121418] border border-[#242529] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#d0d0d1]/60 mb-2">Next steps:</p>
          <ol className="text-left text-sm text-[#d0d0d1] space-y-2">
            <li className="flex gap-2">
              <span className="text-[#0459fe]">1.</span>
              Download Vibey for your platform
            </li>
            <li className="flex gap-2">
              <span className="text-[#0459fe]">2.</span>
              Open the app and enter your license key
            </li>
            <li className="flex gap-2">
              <span className="text-[#0459fe]">3.</span>
              Start building with Claude Code!
            </li>
          </ol>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-[#0459fe] text-white py-3 rounded-lg font-[family-name:var(--font-atkinson)] hover:bg-[#0349d4] transition-colors inline-block"
          >
            Download Vibey
          </Link>
          <Link
            href="/"
            className="text-[#0459fe] text-sm hover:underline"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
