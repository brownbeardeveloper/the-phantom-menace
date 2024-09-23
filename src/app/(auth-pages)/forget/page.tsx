import { forgotPasswordAction } from '../../../services/supabase/data/account_actions';
import Link from 'next/link';

export default function Forget({ searchParams }: { searchParams: any }) {
    // TODO: fix display text
    const message = searchParams.message || ""; // Get the message from searchParams
    const isError = searchParams.error === "Could not reset password"; // Check if there's an error (ensure it's a string comparison)
    console.log(isError);

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
                    <p className="tracking-0.5rem text-white">RESET PASSWORD</p>
                </div>
                <div className="flex flex-row m-5">
                    <form action={forgotPasswordAction} className="w-full max-w-xs">
                        <h1 className="text-2xl font-medium mb-6">Reset Password</h1>
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
                        <p className="text-sm text-foreground mb-4">
                            Remembered your password?{" "}
                            <Link className="text-white font-medium underline" href="/">
                                Sign in
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send Reset Link
                        </button>
                        {message && (
                            <div className={`mt-4 p-2 rounded 'bg-green-500'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
