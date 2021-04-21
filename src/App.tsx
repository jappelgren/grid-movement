import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([[0]]);
  const [widthDepth, setWidthDepth] = useState({ width: 1, depth: 1 });
  const [position, setPosition] = useState([5, 5]);

  const makeWall = (array) => {
    console.log(array);
    const prevGrid = [...grid];
    if (prevGrid[array[0]][array[1]] !== 2) {
      prevGrid[array[0]][array[1]] = 2;
    } else {
      prevGrid[array[0]][array[1]] = 0;
    }
    setGrid(prevGrid);
  };

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
  };

  const positionFinder = (): number[] => {
    for (let i = 0; i < widthDepth?.depth; i++) {
      for (let j = 0; j < widthDepth?.width; j++) {
        if (grid?.[i]?.[j] === 1) {
          return [i, j];
        }
      }
    }
  };

  useEffect(() => {
    setPosition(positionFinder());
  }, [grid]);

  document.onkeydown = (event: any): void => {
    event = event || window.event;
    if (
      event.key === 'ArrowRight' &&
      position[1] < widthDepth.width - 1 &&
      grid[position[0]][position[1] + 1] !== 2
    ) {
      const prevGrid = [...grid];
      prevGrid[position[0]][position[1]] = 0;
      prevGrid[position[0]][position[1] + 1] = 1;
      setGrid(prevGrid);
      setPosition(positionFinder());
    } else if (
      event.key === 'ArrowLeft' &&
      position[1] > 0 &&
      grid[position[0]][position[1] - 1] !== 2
    ) {
      const prevGrid = [...grid];
      prevGrid[position[0]][position[1]] = 0;
      prevGrid[position[0]][position[1] - 1] = 1;
      setGrid(prevGrid);
      setPosition(positionFinder());
    } else if (
      event.key === 'ArrowDown' &&
      position[0] < widthDepth.depth - 1 &&
      grid[position[0] + 1][position[1]] !== 2
    ) {
      const prevGrid = [...grid];
      prevGrid[position[0]][position[1]] = 0;
      prevGrid[position[0] + 1][position[1]] = 1;
      setGrid(prevGrid);
      setPosition(positionFinder());
    } else if (
      event.key === 'ArrowUp' &&
      position[0] > 0 &&
      grid[position[0] - 1][position[1]] !== 2
    ) {
      const prevGrid = [...grid];
      prevGrid[position[0]][position[1]] = 0;
      prevGrid[position[0] - 1][position[1]] = 1;
      setGrid(prevGrid);
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
      <section ref={gridRef} className="main-container">
        <div className="grid-container">
          {grid.map((row, i) => {
            return (
              <section key={i} className="row">
                {grid[i].map((cell, j) => {
                  return cell === 1 ? (
                    <div
                      key={j}
                      className="cell blue"
                      style={{
                        backgroundImage: 'url(/images/gabe.jpg)',
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  ) : (
                    <div
                      key={j}
                      onClick={() => makeWall([i, j])}
                      className={`cell ${cell === 2 ? 'black' : ''}`}
                    ></div>
                  );
                })}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
