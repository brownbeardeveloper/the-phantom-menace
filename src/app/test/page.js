
import { createClient } from "../../services/supabase/server";
import { signOutAction } from "../actions";

export default async function Test() {
    const supabase = createClient();
    const { data: notes, error } = await supabase.from('todos').select('*');

    const handleLogout = async () => {
        const { error } = await signOutAction();
        if (error) {
            console.error("Logout error: ", error);
        } else {
            console.log("Successfully logged out");
            // Optionally redirect or update UI after logout
        }
    };

    if (error) {
        return <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>;
    }
    // console.log("Fetched data: ", notes);

    return (
        <div>
            {error && <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>}
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Logout
            </button>
            <pre>{JSON.stringify(notes, null, 2)}</pre>
        </div>
    );
}