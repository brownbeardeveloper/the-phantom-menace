import { createClient } from "../client"; // Adjust this import as needed

// Function to send a post to Supabase
export const sendPost = async (uid: string, content: string) => {
    const supabase = createClient();

    // Prepare the data to be inserted
    const postData = {
        created_by: uid,
        created_at: new Date().toISOString(), // Current timestamp
        title: "test", // Default title
        content, // User's comment content
    };

    // Insert data into the 'posts' table and return the inserted row(s)
    const { data, error, status, statusText } = await supabase
        .from("post") // Ensure the table name matches your schema
        .insert([postData])
        .select(); // Ensure the inserted data is returned

    // Log the complete response to debug the issue
    console.log("Supabase insert response:", { data, error, status, statusText });

    if (error) {
        console.error("Error sending post:", error.message || "No error message");
        return null; // Handle error appropriately
    }

    return data; // Return the inserted post data (or confirmation)
};
