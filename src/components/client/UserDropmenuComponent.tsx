"use client";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
  } from "@nextui-org/react";
import LogoutButtonComponent from "./LogoutButtonComponent";
  
  export default function UserDropmenuComponent({fullname, email}: { email: string, fullname: string }) {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              description={<span className="text-blue-500">Member</span>}
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                radius: "sm",
                isBordered: true
              }}
              name={fullname}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="shadow">
            <DropdownItem key="profile" showDivider isReadOnly>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" className="text-danger" color="danger">
              <LogoutButtonComponent />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
  