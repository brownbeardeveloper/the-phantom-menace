// src/components/server/MakePostComponent.tsx
"use client";

import { useState } from "react"; // Import useState
import { Card, CardBody, CardFooter, Button, Textarea } from "@nextui-org/react";
import { sendPost } from "../../services/supabase/data/send_data"; // Import sendPost function

export default function MakePostComponent({ user }) {
    const [content, setContent] = useState(""); // State to hold textarea input
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [error, setError] = useState(""); // State to manage errors

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission

        if (!content.trim()) {
            setError("Content cannot be empty");
            return;
        }

        setLoading(true); // Set loading state
        setError(""); // Clear previous errors

        try {
            // Call sendPost with user ID and content
            const result = await sendPost(user.uid, content);

            if (result) {
                console.log("Post sent successfully:", result);
                setContent(""); // Clear the input field after successful submission
            } else {
                console.error("Error sending post");
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setError("Failed to send the post. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full mb-4 mx-auto" radius="none" shadow="lg">
                <CardBody>
                    <Textarea
                        name="content" // This will be used to send the user's comment
                        label="Your Comment"
                        placeholder="Type your comment here..."
                        minRows={4}
                        required
                        radius="none"
                        value={content} // Bind state value to Textarea
                        onChange={(e) => setContent(e.target.value)} // Update state on change
                    />
                    {/* Display current input and user ID */}
                    {/* <div className="mt-2">
                        <p className="text-gray-600">Current Input: {content}</p>
                        <p className="text-gray-600">User ID: {user.uid}</p>
                    </div> */}
                    {error && <p className="text-red-600 mt-2">{error}</p>} {/* Display error message if any */}
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button
                        type="submit"
                        radius="none"
                        className="bg-gradient-to-br from-teal-900 to-purple-300 text-white"
                        isDisabled={loading} // Disable the button while loading
                    >
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
