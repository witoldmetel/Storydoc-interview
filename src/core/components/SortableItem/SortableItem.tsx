import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DraggableType } from '../../store/types';

type SortableItemProps = {
  id: string;
  type: DraggableType;
  children: React.ReactNode;

  additionalData?: unknown;
};

export const SortableItem = ({ id, type, children, additionalData }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      id,
      type,
      additionalData,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? '0.3' : '1',
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: setNodeRef } as React.HTMLProps<HTMLDivElement>);
    }

    return child;
  });

  return (
    <div {...attributes} {...listeners} style={style}>
      {childrenWithProps}
    </div>
  );
};
