import { useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "../styles/card.css";
const defaultLayout: Layout[] = [
  { i: "1", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "2", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "3", x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "4", x: 2, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "5", x: 6, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
];

const Desktop = () => {
  const savedLayout = JSON.parse(localStorage.getItem("layout") as string);
  const [layout, setLayout] = useState<Layout[]>(savedLayout || defaultLayout);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClickCard = (id: string) => {
    setSelectedItemId(id);
  };

  const handleRemoveCard = (id: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem("layout");
  };

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(layout));
  }, [layout]);
  return (
    <div className="desktop">
      <button onClick={resetLayout}>Reset to Default</button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={20}
        width={900}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        isResizable={true}
        isDraggable={true}
        allowOverlap={true}
        compactType={null}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className={`card ${selectedItemId === item.i ? "card--active" : ""}`}
            onMouseDown={(e) => stopPropagation(e)}
            onClick={() => handleClickCard(item.i)}
          >
            <button
              className="card__close"
              onMouseDown={(e) => stopPropagation(e)}
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
