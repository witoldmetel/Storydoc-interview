import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  id: number;
  children: React.ReactNode;
};

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Pass additionalProps to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...listeners });
    }
    return child;
  });

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {childrenWithProps}
    </div>
  );
};
