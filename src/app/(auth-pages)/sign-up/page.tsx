import { signUpAction } from '../../actions';
import Link from 'next/link';

export default function SignUp({ searchParams }: { searchParams: any }) {
    return (
      <main className="h-screen w-screen flex flex-row">
        <div className="h-screen w-1/4 p-5 min-w-60">
          <h1 className="font-bold text-2xl italic">WebCommunity™</h1>
          <h2 className="m-5 font-bold text-teal-900">
            Join the World's FREE Web-Based Community
          </h2>
          <p className="text-xs">© 1996-1997 WebCommunity. All rights reserved.</p>
        </div>
        <div className="h-screen w-screen p-2 pt-5 bg-teal-500">
          <div className="font-bold bg-teal-700">
            <p className="tracking-0.5rem text-white">REGISTER NOW</p>
          </div>
          <div className="flex flex-row m-5">
            <form action={signUpAction} method="post" className="flex-1 flex flex-col min-w-64">
              <h1 className="text-2xl font-medium">Sign up</h1>
              <p className="text-sm text-foreground">
                Already have an account?{" "}
                <Link className="text-foreground font-medium underline" href="/">
                  Sign in
                </Link>
              </p>
              <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <label htmlFor="email">Email</label>
                <input name="email" placeholder="you@example.com" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Your password" required />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }