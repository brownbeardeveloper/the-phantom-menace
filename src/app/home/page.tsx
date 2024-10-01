import { redirect } from "next/navigation";
import { createClient } from "../../services/supabase/server";
import { getUserInfo, getUserInfoById } from "../../services/supabase/data/get_data";
import NavbarComponent from "../../components/client/NavbarComponent";
import PostComponent from "../../components/server/PostComponent";


export default async function Test() {
    // Create Supabase client and fetch posts (for testing)
    const supabase = createClient();
    const { data: notes, error } = await supabase.from('post').select('*');

    // Fetch authenticated user info
    const user = await getUserInfo();

    if (!user) {
        // If the user is not logged in, redirect to the homepage
        return redirect("/");
    }

    // If there's an error fetching posts, display an error
    if (error) {
        return <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>;
    }

    // Fetch the user info for each note creator (note.created_by)
    const notesWithUserInfo = await Promise.all(
        notes.map(async (note: any) => {
            const createdByUser = await getUserInfoById(note.created_by); // Get user info by creator ID
            return { ...note, createdByUser }; // Append user info to each note
        })
    );

    return (
        <div className="min-h-screen bg-teal-500 flex flex-col items-center">
            {/* Fixed Navbar */}
            <NavbarComponent
                user={user} // Assuming signOutAction is a function
            />

            {/* Main content with three sections */}
            <div className="mt-20 w-full max-w-7xl px-4 flex space-x-4">
                {/* Left Section */}
                <div className="w-1/4 bg-gray-100 p-4">
                    {/* Placeholder for left content */}
                    <p>Left section content</p>
                </div>

                {/* Middle Section with Card */}
                <div className="w-3/4">
                    {notesWithUserInfo.map((post: any) => (
                        <PostComponent
                            key={post.id}
                            post={{
                                id: post.id,
                                title: post.title,
                                content: post.content,
                                created_at: post.created_at
                            }}
                            createdByUser={post.createdByUser}
                        />
                    ))}
                </div>

                {/* Right Section */}
                <div className="w-1/4 bg-gray-100 p-4">
                    {/* Placeholder for right content */}
                    <p>Right section content</p>
                </div>
            </div>
        </div>
    );
}
