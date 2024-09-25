import { Navbar, NavbarContent } from "@nextui-org/react";
import LogoutButtonComponent from "../components/ui/LogoutButtonComponent";

interface NavbarProps {
    user: {
        name: string;
        last_name: string;
    };
}

const NavbarComponent = ({ user }: NavbarProps) => {

    return (
        <Navbar className="fixed top-0 left-0 right-0 bg-white shadow-xl">
            <NavbarContent>
                Navbar exempel
            </NavbarContent>
            <NavbarContent justify="end">
                <span className="mr-4">{user.name} {user.last_name}</span>
                <LogoutButtonComponent />
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;
