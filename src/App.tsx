import { For, createSignal, Show, onMount } from "solid-js";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import { AppContext, CodeFile } from "./context/SessionContext";
import { useContext } from "solid-js";

function App() {
  const ctx = useContext(AppContext);
  const [isHoveringDiv, setIsHoveringDiv] = createSignal(false);
  let codeRefs: HTMLTextAreaElement[];
  let hoverDivRef: HTMLDivElement;

  onMount(() => {
    let files = localStorage.getItem('files');
    if (files) {
      let loadedFiles: CodeFile[] = JSON.parse(files);
      ctx?.setCodeFiles(loadedFiles);
    }
  });

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
    ctx?.setCodeFiles([...ctx.codeFiles(), { title: 'Untitled', code: ''}]);
  };

  const onDeleteCodeCell = (index: number) => {
    let newCodeCells: CodeFile[] = [...ctx?.codeFiles() as CodeFile[]];
    newCodeCells.splice(index, 1);
    ctx?.setCodeFiles([...newCodeCells]);
  };

  const onSave = () => {
    localStorage.setItem('files', JSON.stringify(ctx?.codeFiles()));
  };

  return (
    <div class="w-full h-screen">
      <Header />

      <div class="flex flex-row h-screen">
        <Sidebar saveFn={onSave} />

        <main class="w-5/6 bg-slate-600 flex flex-col p-3 text-white overflow-y-auto pb-96">
          <For each={ctx?.codeFiles()}>
            {(file, i) => (
              <CodeEditor
                ref={codeRefs[i()]}
                deleteFn={() => onDeleteCodeCell(i())}
                fileIndex={i()}
                title={file.title}
                codeContent={file.code}
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
