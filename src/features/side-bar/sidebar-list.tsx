import type { ReactNode } from 'react';

import { cn } from '@heroui/react';
import React from 'react';

type WithKey<T> = T & { key: string };

type SidebarListProps<T> = {
  itemData: WithKey<T>[];
  renderItem: (data: WithKey<T>) => ReactNode;
  appendItems?: ReactNode[];
};

export function SidebarList<T>({ itemData, renderItem, appendItems }: SidebarListProps<T>) {
  return (
    <ul
      className={cn(
        'flex h-[40vh] flex-col justify-center gap-4',
        'group-data-[closed=true]:invisible group-data-[closed=true]:h-0',
        'md:group-data-[closed=true]:visible md:group-data-[closed=true]:h-screen',
        'duration-400 ease-in-out'
      )}
    >
      {itemData.map((data) => {
        return <li key={data.key}>{renderItem(data)}</li>;
      })}

      {appendItems?.map((item, index) => (
        <li key={`sidebar-append-${index.toString()}`}>{item}</li>
      ))}
    </ul>
  );
}
