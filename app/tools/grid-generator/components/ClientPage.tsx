"use client";

import { useState, useEffect } from "react";
import GridLayout, { LayoutItem, WidthProvider } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function CSSGridGenerator() {
  const [cols, setCols] = useState(5);
  const [gap, setGap] = useState(8);
  const [cardType, setCardType] = useState<"square" | "rectangle" | "custom">("square");
  const [layout, setLayout] = useState<LayoutItem[]>(
    Array.from({ length: 9 }, (_, index) => ({
      i: String(index + 1),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }))
  );

  const addItem = () => {
    let maxId = 0;
    layout.forEach((item) => {
      const numId = parseInt(item.i);
      if (!isNaN(numId) && numId > maxId) {
        maxId = numId;
      }
    });

    const maxY = layout.length > 0 ? Math.max(...layout.map((item) => item.y + item.h)) : 0;

    const newItem: LayoutItem = {
      i: String(maxId + 1),
      x: 0,
      y: maxY,
      w: cardType === "square" ? 1 : cardType === "rectangle" ? 2 : 1,
      h: cardType === "square" ? 1 : cardType === "rectangle" ? 1 : 2,
    };
    setLayout((prev) => [...prev, newItem]);
  };

  const isOverlap = (a: LayoutItem, b: LayoutItem) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  const handleMerge = (currentLayout: LayoutItem[]) => {
    const mergedLayout = [...currentLayout];
    for (let i = 0; i < mergedLayout.length; i++) {
        for (let j = i + 1; j < mergedLayout.length; j++) {
            const a = mergedLayout[i];
            const b = mergedLayout[j];
            if (isOverlap(a, b)) {
                mergedLayout[i] = {
                    x: Math.min(a.x, b.x),
                    y: Math.min(a.y, b.y),
                    w: Math.max(a.x + a.w, b.x + b.w) - Math.min(a.x, b.x),
                    h: Math.max(a.y + a.h, b.y + b.h) - Math.min(a.y, b.y),
                    i: a.i,
                };
                mergedLayout.splice(j, 1);
                j--;
            }
        }
    }
    setLayout(mergedLayout);
  };

  const generateCSS = () => `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;
  padding: ${gap}px;
}
${layout
  .map(
    (item) => `
.item-${item.i} {
  grid-column: ${item.x + 1} / span ${item.w};
  grid-row: ${item.y + 1} / span ${item.h};
  min-height: 60px;
}`
  )
  .join("\n")}
`;

  const generateHTML = () => `
<div class="grid-container">
${layout.map((item) => `  <div class="item-${item.i}">Item ${item.i}</div>`).join("\n")}
</div>
`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied ✅");
  };

  const resetGrid = () => {
    setLayout([
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 1, y: 0, w: 1, h: 1 },
      { i: "3", x: 2, y: 0, w: 1, h: 1 },
    ]);
  };

  // Modern UI card style base
  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";
  const btnPrimaryClass = "w-full py-3 px-4 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2";
  const btnSecondaryClass = "w-full py-3 px-4 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Header Info */}
          <div className={cardBaseClass}>
            <h2 className="text-2xl font-bold flex items-center gap-2">🎨 CSS Grid Generator</h2>
            <p className="text-gray-400 text-sm">
              Create responsive grid layouts visually. Drag, resize, and merge items to generate perfect CSS Grid code.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Settings */}
            <div className={`lg:col-span-1 ${cardBaseClass}`}>
              <h3 className="text-xl font-bold mb-2">⚙️ Settings</h3>
              
              <div className="space-y-6">
                {/* Card Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Card Type</label>
                  <div className="flex gap-2">
                    {["square", "rectangle", "custom"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCardType(type as any)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                          cardType === type ? "bg-white text-black" : "border border-white/20 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Columns */}
                <div>
                  <label className="flex justify-between text-sm font-semibold text-gray-300 mb-2">
                    <span>Columns</span>
                    <span className="text-white">{cols}</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    value={cols}
                    onChange={(e) => setCols(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2</span><span>4</span><span>6</span><span>8</span><span>10</span><span>12</span>
                  </div>
                </div>

                {/* Gap */}
                <div>
                  <label className="flex justify-between text-sm font-semibold text-gray-300 mb-2">
                    <span>Gap</span>
                    <span className="text-white">{gap}px</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    step={4}
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span><span>8</span><span>16</span><span>24</span><span>32</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button onClick={addItem} className={btnPrimaryClass}>
                    ➕ Add Card
                  </button>
                  <button onClick={resetGrid} className={btnSecondaryClass}>
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Canvas */}
            <div className={`lg:col-span-2 ${cardBaseClass} min-h-[500px]`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">🧩 Grid Canvas</h3>
                <button onClick={() => handleMerge(layout)} className={btnSecondaryClass + " !w-auto !py-2 !px-4 text-sm"}>
                  🧩 Merge Overlapping
                </button>
              </div>

              <div className="flex-1 overflow-x-auto w-full">
                <div style={{ minWidth: "100%" }}>
                  <ResponsiveGridLayout
                    layout={layout}
                    cols={cols}
                    rowHeight={80}
                    margin={[gap, gap]}
                    isResizable={true}
                    isDraggable={true}
                    onDragStop={(newLayout) => handleMerge(newLayout as LayoutItem[])}
                    onResizeStop={(newLayout) => handleMerge(newLayout as LayoutItem[])}
                    onLayoutChange={(newLayout) => setLayout(newLayout as LayoutItem[])}
                    useCSSTransforms={true}
                    preventCollision={false}
                    compactType={null}
                    style={{
                      minHeight: Math.max(400, Math.ceil(layout.length / cols) * 80 + gap * (layout.length / cols)),
                    }}
                  >
                    {layout.map((item) => (
                      <div
                        key={item.i}
                        className="bg-white/10 rounded-2xl flex flex-col items-center justify-center font-semibold text-sm border border-white/5 relative select-none hover:bg-white/20 transition-colors cursor-move"
                      >
                        <div className="absolute top-2 right-2 text-[10px] bg-black/40 px-2 py-1 rounded-md text-gray-300 pointer-events-none">
                          {item.w}x{item.h}
                        </div>
                        <div className="text-center pointer-events-none p-2">
                          <div className="text-lg font-bold">Item {item.i}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {item.w}×{item.h} grid
                          </div>
                        </div>
                      </div>
                    ))}
                  </ResponsiveGridLayout>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                👆 Drag to move | ↔️ Drag edges to resize
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className={cardBaseClass}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">📄 Generated Code</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button onClick={() => copy(generateCSS())} className={btnSecondaryClass + " !w-auto !py-2 !px-4 text-sm"}>
                  📋 Copy CSS
                </button>
                <button onClick={() => copy(generateHTML())} className="w-full sm:w-auto py-2 px-4 rounded-xl font-semibold bg-green-500 hover:bg-green-400 text-white transition-all flex items-center justify-center gap-2 text-sm border-none">
                  📋 Copy HTML
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-gray-400">HTML Preview</h4>
                <pre className="flex-1 bg-black/50 p-4 rounded-xl overflow-auto text-xs sm:text-sm font-mono text-gray-300 border border-white/5 whitespace-pre-wrap">
                  {generateHTML()}
                </pre>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-gray-400">CSS Preview</h4>
                <pre className="flex-1 bg-black/50 p-4 rounded-xl overflow-auto text-xs sm:text-sm font-mono text-gray-300 border border-white/5 whitespace-pre-wrap">
                  {generateCSS()}
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
