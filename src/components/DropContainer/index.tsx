import { useState } from 'react';
import { DragBox } from '../DragBox';
import { WeatherCard } from '../WeatherCard';

interface IItem {
  id: number;
  order: number;
  index: number;
}

export const DropContainer: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([
    { id: 1, order: 0, index: 0 },
    { id: 2, order: 1, index: 1 },
    { id: 3, order: 2, index: 2 },
    { id: 4, order: 3, index: 3 },
    { id: 5, order: 4, index: 4 },
    { id: 6, order: 5, index: 5 },
  ]);

  const [currentItem, setCurrentItem] = useState<IItem | null>(null);

  const onDragStartHandler = (item: IItem) => () => {
    setCurrentItem(item);
  };

  const onDropHandler = (droppedItem: IItem) => () => {
    if (!currentItem) return;

    const newItems = items.map((item) => {
      if (droppedItem.id === item.id) {
        return { ...item, order: currentItem.order };
      }
      if (currentItem.id === item.id) {
        return { ...item, order: droppedItem.order };
      }
      return { ...item };
    });
    setItems(newItems.sort((a: IItem, b: IItem) => a.order - b.order));
  };

  return (
    <div
      className="grid grid-cols-1 place-items-center gap-4 p-10 w-fill h-full
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-3
    2xl:grid-cols-5"
    >
      {items.map((item) => (
        <DragBox
          key={item.id}
          onDragStart={onDragStartHandler(item)}
          onDrop={onDropHandler(item)}
        >
          <WeatherCard index={item.index} />
        </DragBox>
      ))}
    </div>
  );
};
