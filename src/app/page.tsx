"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-lg bg-white max-w-sm w-full text-center">
        {session ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              👋 Welcome, <span className="text-indigo-600">{session.user?.name}</span>
            </h1>
            <p className="text-gray-500 mt-2">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-6 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition duration-300"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Sign in to Continue
            </h1>
            <button
              onClick={() => signIn("github")}
              className="w-full py-2 px-4 bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.387 7.868 10.91.576.107.786-.25.786-.556 0-.273-.01-1.174-.016-2.132-3.2.696-3.875-1.54-3.875-1.54-.523-1.332-1.277-1.687-1.277-1.687-1.043-.714.079-.7.079-.7 1.153.082 1.759 1.185 1.759 1.185 1.025 1.757 2.688 1.25 3.343.955.104-.742.4-1.25.727-1.538-2.553-.292-5.238-1.277-5.238-5.683 0-1.255.449-2.282 1.185-3.086-.119-.292-.513-1.468.112-3.06 0 0 .967-.31 3.171 1.176a11.04 11.04 0 0 1 2.886-.389c.979.004 1.964.132 2.886.389 2.204-1.486 3.17-1.176 3.17-1.176.626 1.592.232 2.768.114 3.06.737.804 1.184 1.831 1.184 3.086 0 4.415-2.689 5.387-5.25 5.672.412.356.775 1.066.775 2.152 0 1.556-.014 2.807-.014 3.19 0 .308.208.669.793.555C20.71 21.385 24 17.086 24 12c0-6.352-5.148-11.5-12-11.5z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
