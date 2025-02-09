import { Avatar } from "./ui/avatar.tsx"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import PageHeader from "../components/PageHeader"
import {useEffect, useState} from "react";
import {BreadcrumbLink, BreadcrumbRoot} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

const TopNav = ({ headerTitle, links }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = date.getDate();
  const month = date.toLocaleDateString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
      <div className="w-full py-5 px-5 flex justify-between">
        <div className="font-sans flex justify-between items-center w-1/2">
          <div>
            <div className="text-xxl font-semibold">{headerTitle}</div>
            <div>
              <BreadcrumbRoot>
                {links.map((link, index) => (
                    <BreadcrumbLink key={index}>
                      <Link to={link.to} className="text-gray-400">{link.name}</Link>
                    </BreadcrumbLink>
                ))}
              </BreadcrumbRoot>
            </div>
          </div>
          <div>
            {day} {month} {year} {hours}:{minutes.toString().padStart(2, '0')}
          </div>
        </div>
        <nav className="flex items-center justify-end gap-10">
          <h2>Welcome back, <span className="font-bold">Kwabena</span></h2>
          <div>
            <div className="flex gap-2">
              <Avatar variant="solid" name="Kobby"/>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                    <EllipsisVerticalIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400"/>
                  </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Account settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Log out
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default TopNav