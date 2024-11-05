'use client';

import { links } from '@/data';
import { Button } from '@nextui-org/button';
import { IconMenu, IconX } from '@tabler/icons-react';
import Icon from '../../icon';

type SideBarProps = {
   opened: boolean;
   toggle: () => void;
}

export function SideBar(props:SideBarProps) {
  const { opened, toggle } = props;
  return (
    <>
      {opened && (
      <div className="fixed inset-0 bg-black/50 lg:hidden" />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${opened ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        z-20
      `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your App</h2>
          <Button
            onClick={toggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <IconX size={20} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon icon={item.icon} size={12} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div>
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>
      <Button
        onClick={toggle}
        className="fixed lg:hidden left-4 top-4 p-2 rounded-md bg-white shadow-md z-30"
      >
        <IconMenu size={20} />
      </Button>
    </>
  );
}
