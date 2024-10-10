"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@nextui-org/react";
import LogoutButtonComponent from "./LogoutButtonComponent";

export default function UserDropmenuComponent({ fullname, email }: { email: string, fullname: string }) {


  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          src="https://avatarfiles.alphacoders.com/322/thumb-1920-322895.jpg"
          name={fullname}
          radius="sm"
        // isBordered
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="User Actions" variant="shadow">
        <DropdownItem key="profilename" isReadOnly showDivider>
          <p className="font-semibold">{fullname}</p>
        </DropdownItem>
        {/* <DropdownItem key="profile" showDivider isReadOnly>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem> */}
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger">
          <LogoutButtonComponent />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
