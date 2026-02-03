interface IDragBoxProps {
  onDragStart: () => void;
  onDrop: () => void;
  children: React.ReactNode;
}

export const DragBox: React.FC<IDragBoxProps> = ({
  onDragStart,
  onDrop,
  children,
}) => {
  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
};
