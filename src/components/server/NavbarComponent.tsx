import { Navbar, NavbarContent } from "@nextui-org/react";
import UserDropmenuComponent from "../client/UserDropmenuComponent";

interface NavbarProps {
    user: {
        name: string;
        last_name: string;
        email: string;
    };
}

const NavbarComponent = ({ user }: NavbarProps) => {

    return (
        <Navbar className="fixed top-0 left-0 right-0 bg-white shadow-xl">
            <NavbarContent>
                Navbar exempel
            </NavbarContent>
            <NavbarContent justify="end">

                {/* <span>{user.name} {user.last_name}</span> */}
                <UserDropmenuComponent fullname={user.name + ' ' + user.last_name} email={user.email}/>
                {/* <LogoutButtonComponent /> */}
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;
