import React, { useState } from 'react';

import './EditableListItem.scss';

type EditableListItemProps = {
  name?: string;

  confirmHandler: (name: string) => void;
  callback: VoidFunction;
};

export const EditableListItem = ({ name, confirmHandler, callback }: EditableListItemProps) => {
  const [listName, setListName] = useState(name ?? '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const createNewList = () => {
    if (listName) {
      confirmHandler(listName);
      setListName('');
    }

    callback();
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      createNewList();
    }
  };

  return (
    <input
      type="text"
      className="list-input"
      placeholder="Title of the new list..."
      maxLength={28}
      value={listName}
      onChange={handleInputChange}
      onBlur={createNewList}
      onKeyDown={handleInputKeyPress}
      autoFocus
    />
  );
};
