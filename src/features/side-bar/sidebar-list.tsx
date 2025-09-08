import type { ReactNode } from 'react';

import { cn } from '@heroui/react';
import React from 'react';

type WithTitle<T> = T & { title: string };

type SidebarListProps<T> = {
  itemData: WithTitle<T>[];
  renderItem: (data: WithTitle<T>) => ReactNode;
  appendItems?: ReactNode[];
};

export function SidebarList<T>({ itemData, renderItem, appendItems }: SidebarListProps<T>) {
  return (
    <ul
      className={cn(
        'mt-5 flex max-h-screen flex-col gap-3',
        'group-data-[closed=true]:invisible group-data-[closed=true]:max-h-0',
        'md:group-data-[closed=true]:visible md:group-data-[closed=true]:max-h-screen',
        'duration-400 ease-in-out'
      )}
    >
      {itemData.map((data) => {
        return <li key={data.title}>{renderItem(data)}</li>;
      })}

      {appendItems?.map((item, index) => (
        <li key={`sidebar-append-${index.toString()}`}>{item}</li>
      ))}
    </ul>
  );
}
