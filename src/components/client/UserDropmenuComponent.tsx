"use client";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
  } from "@nextui-org/react";
import LogoutButtonComponent from "./LogoutButtonComponent";
  
  export default function UserDropmenuComponent({fullname, email, profilePictureSize}: { email: string, fullname: string, profilePictureSize: string }) {
    
    
    return (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                src: "https://avatarfiles.alphacoders.com/322/thumb-1920-322895.jpg",
                radius: "sm",
                isBordered: false,
                style: { width: profilePictureSize, height: profilePictureSize },
              }}
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
    );
  }
  