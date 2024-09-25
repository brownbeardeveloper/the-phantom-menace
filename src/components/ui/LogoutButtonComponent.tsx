// components/ui/LogoutButtonComponent.tsx
"use client";

import { Button } from "@nextui-org/react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { signOutAction } from "../../services/supabase/account/account_actions";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string; // Allows customization of the pending text
};

const LogoutButtonComponent = ({
    children = "Logout", // Default text if no children are provided
    pendingText = "Logging out...", // Default pending text
    ...props // Spread other button props
}: Props) => {
    const { pending } = useFormStatus(); // Check the form status

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        await signOutAction(); // Call the signOutAction function
    };

    return (
        <form onSubmit={handleLogout}> {/* Form encapsulating the button */}
            <Button 
                type="submit" 
                color="danger" 
                aria-disabled={pending} 
                disabled={pending} // Disable the button when pending
                {...props} // Spread other props to the button
            >
                {pending ? pendingText : children} {/* Show loading text when pending */}
            </Button>
        </form>
    );
};

export default LogoutButtonComponent;
