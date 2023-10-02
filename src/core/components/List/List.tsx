import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { Plus } from '../../../assets/icons';
import { useHover } from '../../hooks/useHover';
import { updateList } from '../../store/slices/listSlice';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { Button } from '../Button/Button';
import { EditableListItem } from '../EditableListItem/EditableListItem';

import './List.scss';

type ListProps = {
  id: number;
  name: string;

  cards: any;
};

export const List = ({ id, name, cards }: ListProps) => {
  const dispatch = useDispatch();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      {editMode ? (
        <EditableListItem
          confirmHandler={(listName) =>
            dispatch(
              updateList({
                id,
                newName: listName,
              })
            )
          }
          callback={() => setEditMode(false)}
        />
      ) : (
        <div className="list">
          <div
            className={clsx('list-name', { hovered: isHovering && !editMode })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <h1>{name}</h1>
            {isHovering && !editMode ? (
              <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={() => console.log('delete')} />
            ) : null}
          </div>

          {cards.length
            ? cards.map((card: any) => (
                <div key={card.id} className="list__card">
                  <p>Card #1</p>
                </div>
              ))
            : null}
          <Button onClick={() => console.log('add new card')} className="button-card-creator">
            <div className="card-creator-content">
              <Plus color="#88819f" />
              <p className="card-creator-name">Add a card</p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
