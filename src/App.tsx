import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([[0]]);
  const [widthDepth, setWidthDepth] = useState({ width: 1, depth: 1 });
  const [position, setPosition] = useState([5,5])

  function gridBuilder(width: number, depth: number): void {
    let gridArr: number[][] = [];

    for (let i = 0; i < depth; i++) {
      gridArr.push([]);
      for (let j = 0; j < width; j++) {
        if (gridArr[0][0] === 1) {
          gridArr[i].push(0);
        } else {
          gridArr[i].push(1);
        }
      }
    }
    setGrid(gridArr);
  }

  const gridRef = useRef(null);

  const handleSubmit = (event): void => {
    event.preventDefault();
    gridBuilder(widthDepth.width, widthDepth.depth);
    gridRef.current.focus();
    setPosition(positionFinder());
  };

  const positionFinder = () => {
    for (let i = 0; i < widthDepth?.depth; i++) {
      for (let j = 0; j < widthDepth?.width; j++) {
        if (grid?.[i]?.[j] === 1) {
          return [i, j];
        }
      }
    }
  };

  document.onkeydown = (event: any): void => {
    event = event || window.event;
    if (event.key === 'ArrowRight' && position[1] < widthDepth.width -1) {
      const prevGrid = [...grid]
      prevGrid[position[0]][position[1]] = 0
      prevGrid[position[0]][position[1] + 1] = 1
      setGrid(prevGrid)
      setPosition(positionFinder());
    }
  };

  return (
    <main>
      <header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="width">Width</label>
          <input
            min="1"
            max="100"
            value={widthDepth.width}
            onChange={(event) =>
              setWidthDepth({
                ...widthDepth,
                width: Number(event.target.value),
              })
            }
            name="width"
            type="number"
          />
          <label htmlFor="depth">Depth</label>
          <input
            min="1"
            max="100"
            value={widthDepth.depth}
            onChange={(event) =>
              setWidthDepth({
                ...widthDepth,
                depth: Number(event.target.value),
              })
            }
            name="depth"
            type="number"
          />
          <button type="submit">Make Grid</button>
        </form>
      </header>
      <section ref={gridRef} className="grid-container">
        {grid.map((row, i) => {
          return (
            <section key={i} className="row">
              {grid[i].map((cell, i) => {
                return cell === 1 ? (
                  <div key={i} className="cell blue"></div>
                ) : (
                  <div key={i} className="cell"></div>
                );
              })}
            </section>
          );
        })}
      </section>
    </main>
  );
}

export default App;
