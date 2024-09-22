
import { redirect } from "next/navigation";
import { createClient } from "../../services/supabase/server";
import { signOutAction } from "../../services/supabase/data/account_actions";
import { getUserInfo } from "../../services/supabase/data/get_data";

export default async function Test() {
    // skapa createClient och hämta todos data, bara för testens skull
    const supabase = createClient();
    const { data: notes, error } = await supabase.from('todos').select('*');

    // hämta user info via supabase.auth.getUser()
    const user = await getUserInfo();

    if (!user) {
        // om användaren är inte inloggad, redirecta tbx t startsidan
        return redirect("/");
    }
    
    if (error) {
        return <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>;
    }

    return (
        <div>
            {error && <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>}
            <form action={signOutAction}>
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </form>
            <h1>Hey, {user.name + " " + user.last_name}!</h1>
            <pre>{JSON.stringify(notes, null, 2)}</pre>
        </div>
    );
}
