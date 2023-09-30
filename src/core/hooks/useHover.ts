import { MouseEventHandler, useState } from 'react';

export const useHover = (): [boolean, MouseEventHandler<HTMLDivElement>, MouseEventHandler<HTMLDivElement>] => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  return [isHovering, handleMouseOver, handleMouseOut];
};
