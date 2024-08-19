import { useEffect, useState, useCallback } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "../styles/card.css";

interface CustomLayout extends Layout {
  zIndex: number;
}

const defaultLayout: CustomLayout[] = [
  { i: "1", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2, zIndex: 1 },
  { i: "2", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2, zIndex: 1 },
  { i: "3", x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2, zIndex: 1 },
  { i: "4", x: 2, y: 2, w: 4, h: 2, minW: 2, minH: 2, zIndex: 1 },
  { i: "5", x: 6, y: 2, w: 4, h: 2, minW: 2, minH: 2, zIndex: 1 },
];

const Desktop = () => {
  const savedLayout = JSON.parse(localStorage.getItem("layout") as string) || defaultLayout;
  const [layout, setLayout] = useState<CustomLayout[]>(savedLayout);

  const saveLayoutToLocalStorage = useCallback(() => {
    localStorage.setItem("layout", JSON.stringify(layout));
  }, [layout]);

  useEffect(() => {
    saveLayoutToLocalStorage();
  }, [saveLayoutToLocalStorage]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item) => ({
      ...item,
      zIndex: layout.find((l) => l.i === item.i)?.zIndex || 1,
    }));
    setLayout(updatedLayout);
  };

  const handleClickCard = (id: string) => {
    setLayout((prevLayout) => {
      const maxZIndex = Math.max(...prevLayout.map((item) => item.zIndex), 1);
      return prevLayout.map((item) =>
        item.i === id ? { ...item, zIndex: maxZIndex + 1 } : item
      );
    });
  };

  const handleRemoveCard = (id: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem("layout");
  };

  return (
    <div className="desktop">
      <button onClick={resetLayout}>Reset to Default</button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={20}
        width={900}
        onLayoutChange={handleLayoutChange}
        isResizable={true}
        isDraggable={true}
        allowOverlap={true}
        compactType={null}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="card"
            style={{ zIndex: item.zIndex }}
            onClick={() => handleClickCard(item.i)}
          >
            <button
              className="card__close"
              onClick={() => handleRemoveCard(item.i)}
            >
              x
            </button>
            <div className="card__title">Title {item.i}</div>
            <div className="card__body">Text</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Desktop;