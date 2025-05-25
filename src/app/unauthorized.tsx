import Link from 'next/link'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Amaraiverse | Unauthorized Error",
  description: "Personal Portifilo Application",
};

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h2 className="text-5xl font-extrabold text-white mb-4">401 - Unauthorized Error</h2>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Sorry, you are not Unauthorized to access resource.
      </p>
      <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Login with different account
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
    </div>
  )
}
