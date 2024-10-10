import { redirect } from "next/navigation";
import { createClient } from "../services/supabase/server";
import { getUserInfo, getUserInfoById } from "../services/supabase/data/get_data";
import MakePostComponent from "../components/server/MakePostComponent";
import PostRealtimeComponent from "../components/client/PostRealtimeComponent";

export default async function Home() {
    const supabase = createClient();
    const { data: notes, error } = await supabase.from('post').select('*');

    const user = await getUserInfo();

    if (!user) {
        return redirect("/login");
    }

    if (error) {
        return <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>;
    }

    // Fetch the user info for each note creator (note.created_by)
    const notesWithUserInfo = await Promise.all(
        notes.map(async (note: any) => {
            const createdByUser = await getUserInfoById(note.created_by); // Get user info by creator ID
            return {
                ...note,
                createdByUser: {
                    name: createdByUser?.name || 'Unknown',
                    last_name: createdByUser?.last_name || ''
                }
            };
        })
    );

    // Create a user map for easier access in the client
    const initialUserMap = notesWithUserInfo.reduce((acc, note) => {
        acc[note.created_by] = { name: note.createdByUser.name, last_name: note.createdByUser.last_name };
        return acc;
    }, {} as { [key: string]: { name?: string; last_name?: string } | null });

    return (
            <div className="mt-20 w-full max-w-7xl px-4 flex space-x-4">
                <div className="w-1/4 bg-gray-100 p-4">
                    <p>Left section content</p>
                </div>

                <div className="w-3/4">
                    <MakePostComponent user={user} />
                    <PostRealtimeComponent initialPosts={notesWithUserInfo} initialUserMap={initialUserMap} /> {/* Pass enriched posts and user map */}
                </div>

                <div className="w-1/4 bg-gray-100 p-4">
                    <p>Right section content</p>
                </div>
            </div>
    );
}
