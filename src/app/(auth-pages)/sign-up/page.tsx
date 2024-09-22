import { signUpAction } from '../../../services/supabase/data/account_actions';
import Link from 'next/link';

export default function SignUp({ searchParams }: { searchParams: any }) {
  
  const successMessage = searchParams.success ? "Email validation is sent to you, check your email." : "";

  return (
    <main className="h-screen w-screen flex flex-row">
      <div className="h-screen w-1/4 p-5 min-w-60">
        <h1 className="font-bold text-2xl italic">WebCommunity™</h1>
        <h2 className="m-5 font-bold text-teal-900">
          The World's FREE Web-Based Community
        </h2>
        <p className="text-xs">© 1996-1997 WebCommunity. All rights reserved.</p>
      </div>
      <div className="h-screen w-screen p-2 pt-5 bg-teal-500">
        <div className="font-bold bg-teal-700">
          <p className="tracking-0.5rem text-white">REGISTER NOW</p>
        </div>
        <div className="flex flex-row m-5">
          <form action={signUpAction} className="w-full max-w-xs">
            <h1 className="text-2xl font-medium mb-6">Sign up</h1>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                name="name"
                placeholder="John"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last name
              </label>
              <input
                name="lastname"
                placeholder="Doe"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                name="email"
                placeholder="you@example.com"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <p className="text-sm text-foreground mb-6">
              Already have an account?{" "}
              <Link className="text-white font-medium underline" href="/">
                Sign in
              </Link>
            </p>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            {successMessage && (
              <div className="mt-4 bg-green-500">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
