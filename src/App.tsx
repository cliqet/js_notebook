import { For, createSignal, Show } from "solid-js";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";

function App() {
  let codeRefs: HTMLTextAreaElement[];
  const [codeCells, setCodeCells] = createSignal<number[]>([]);
  const [isHoveringDiv, setIsHoveringDiv] = createSignal(false);
  let hoverDivRef: HTMLDivElement;

  const handleOnHover = () => {
    setIsHoveringDiv(true);
  };

  const handleOnHoverLeave = (event: MouseEvent) => {
    const { relatedTarget } = event;

    if (hoverDivRef && !hoverDivRef.contains(relatedTarget as Node)) {
        setIsHoveringDiv(false);
    }
  };

  const onAddCodeCell = () => {
    if (codeCells().length > 0) {
      let lastValue = codeCells().at(-1) as number;
      setCodeCells([...codeCells(), lastValue + 1]);
    } else {
      setCodeCells([...codeCells(), 0]);
    }
    
    console.log('add cells', codeCells());
  }

  const onDeleteCodeCell = (index: number) => {
    let newCodeCells = [...codeCells()];
    newCodeCells.splice(index, 1);
    setCodeCells([...newCodeCells]);
  }

  return (
    <div class="w-full h-screen">
      <Header />

      <div class="flex flex-row h-screen">
        <Sidebar />
        <main class="w-5/6 bg-slate-600 flex flex-col p-3 text-white overflow-y-auto pb-96">
          <For each={codeCells()}>
            {(_, i) => (
              <CodeEditor 
                ref={codeRefs[i()]} 
                deleteFn={() => onDeleteCodeCell(i())}
              />
            )}
          </For>

          <div
            ref={hoverDivRef!}
            class="w-full h-8 flex flex-row items-center justify-center m-1 p-1"
            onMouseOver={handleOnHover}
            onMouseOut={handleOnHoverLeave}
          >
            <Show when={isHoveringDiv()}>
              <button
                class="bg-slate-700 p-1 rounded-full ml-2 w-28"
                onClick={onAddCodeCell}
              >
                + Code
              </button>
            </Show>
          </div>

          <hr />
        </main>
      </div>
    </div>
  );
}

export default App;
