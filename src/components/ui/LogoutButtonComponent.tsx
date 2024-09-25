// components/ui/LogoutButtonComponent.tsx
"use client"; 

import { Button as NextUIButton } from "@nextui-org/react"; // Using NextUIButton for consistency
import { type ComponentProps, useState } from "react"; // Import useState to manage pending state
import { signOutAction } from "../../services/supabase/account/account_actions"; // Importing signOutAction

type Props = ComponentProps<typeof NextUIButton> & {
    pendingText?: string; // Allows customization of the pending text
};

export function LogoutButtonComponent({
    children = "Logout", // Default text if no children are provided
    pendingText = "Logging out...", // Default pending text
    ...props // Spread other button props
}: Props) {
    const [pending, setPending] = useState(false); // Manually handle pending state

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setPending(true); // Set the pending state to true when logout starts
        try {
            await signOutAction(); // Call the signOutAction function
        } catch (error) {
            console.error("Error during logout:", error); // Handle potential errors
        } finally {
            setPending(false); // Reset the pending state to false when logout finishes
        }
    };

    return (
        <form onSubmit={handleLogout}> {/* Form encapsulating the button */}
            <NextUIButton
                type="submit"
                color="danger"
                aria-disabled={pending} // This indicates the button is in a pending state
                {...props}
                disabled={pending} // Disable the button when pending
                className="w-full"
            >
                {pending ? pendingText : children} {/* Show pendingText when pending */}
            </NextUIButton>
        </form>
    );
}

export default LogoutButtonComponent;
