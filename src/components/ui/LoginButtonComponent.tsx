// components/ui/SubmitButton.tsx
"use client"; // Make sure this line is at the very top

import { Button as NextUIButton } from "@nextui-org/react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof NextUIButton> & {
    pendingText?: string;
};

export function LoginButtonComponent({
    children,
    pendingText = "Logging in...",
    ...props
}: Props) {
    const { pending } = useFormStatus();

    return (
        <NextUIButton
            type="submit"
            aria-disabled={pending} // This indicates the button is in a pending state
            {...props}
            disabled={pending} // This actually disables the button
        >
            {pending ? pendingText : children}
        </NextUIButton>
    );
}
