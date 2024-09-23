import { signInAction } from "../services/supabase/data/account_actions";
import Link from "next/link";

export default function Home({ searchParams }: { searchParams: any }) {

    // TODO: fix successmessage
    const successMessage = searchParams.success ? "Login successful! Welcome back." : "";

    return (
        <main className="h-screen w-screen flex flex-row">
            <div className="h-screen w-1/4 p-5 min-w-60">
                <h1 className="font-bold text-2xl italic">WebCommunity™</h1>
                <h2 className="m-5 font-bold text-teal-900">The World's FREE Web-Based Community</h2>
                <p className="text-xs">© 1996-1997 WebCommunity. All rights reserved.</p>
            </div>
            <div className="h-screen w-screen p-2 pt-5 bg-teal-500">
                <div className="font-bold bg-teal-700">
                    <p className="tracking-0.5rem text-white">REGISTERED USERS</p>
                </div>
                <div className="flex flex-row m-5">
                    <form action={signInAction}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="me@example.com"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <Link href="/sign-up" className="text-white text-xs mt-4 underline">
                                Sign Up Here!
                            </Link>
                            <Link href="/forget" className="text-white text-xs mt-4 underline">
                                Forget password?
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {successMessage && (
                        <div className="mt-4 bg-green-500">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
