import { Component, createSignal, Show } from "solid-js";
import { CodeMirror } from "@solid-codemirror/codemirror";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { indentRange } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import PlayIcon from "../../icons/play-icon";
import DeleteIcon from "../../icons/delete-icon";
import TextIcon from "../../icons/text-icon";
import { AppContext, CodeFile } from "../../context/SessionContext";
import { useContext } from "solid-js";

// declare const CodeMirror: any;

type CodeEditorProps = {
  ref: HTMLTextAreaElement;
  deleteFn: () => void;
  fileIndex: number;
  title: string;
  codeContent: string;
};

const CodeEditor: Component<CodeEditorProps> = (props) => {
  const ctx = useContext(AppContext);
  let view: EditorView | undefined;
  const [code, setCurrentCode] = createSignal("");
  const [srcDoc, setSrcDoc] = createSignal("");
  const [title, setTitle] = createSignal("Untitled");
  const [isEditingTitle, setIsEditingTitle] = createSignal(false);
  const [executed, setExecuted] = createSignal(false);
  let iframeRef: HTMLIFrameElement;

  const onValueChange = (codeValue: string) => {
    setTimeout(() => {
      if (!view) {
        return;
      }
      autoIndent(view);
      
      let newCodeFiles = [...ctx?.codeFiles() as CodeFile[]];
      newCodeFiles[props.fileIndex].code = codeValue;
    }, 1000);
  };

  const autoIndent = (view: EditorView) => {
    const state = view.state;
    view.dispatch({
      changes: indentRange(state, 0, state.doc.length),
    });
  };

  const handleGetValue = () => {
    if (view) {
      const editorValue = view.state.doc.toString();
      setCurrentCode(editorValue);

      setSrcDoc(`
      <html>
        <style>
            body {
                color: white;
            }
        </style>
        <body>
          <div id="console"></div>
          <script>

            let customLog = console.log;
            console.log = function (...messages) {
              let consoleElement = document.getElementById('console');
              messages.forEach(message => {
                if (typeof message === 'object' && message !== null) {
                  consoleElement.innerHTML += (JSON.stringify(message) + " ");
                } else {
                  consoleElement.innerHTML += (message + " ");
                }
              });
              consoleElement.innerHTML += "<br />";
            };

            try {
                ${code()}
            } catch (err) {
                let consoleElement = document.getElementById('console');
                consoleElement.innerHTML = 'ERROR: ' + err;
            }
            
          </script>
        </body>
      </html>
    `);

      setExecuted(true);
    }
  };

  return (
    <div class="flex flex-col mt-3 mb-3">
      <div class="my-2">
        <Show when={!isEditingTitle()}>
          <h1 class="text-xl font-extrabold">{props.title ?? title()}</h1>
        </Show>
        <Show when={isEditingTitle()}>
          <input
            class="rounded-md w-1/4 bg-black p-2 font-bold"
            type="text"
            value={title()}
            onInput={(e) => setTitle(e.target.value)}
          />
        </Show>
      </div>

      <div class="flex flex-row">
        <div class="w-1/12 flex flex-col items-center">
          <button
            class="w-8 h-8 rounded-full bg-orange-600 mb-2 flex items-center justify-center"
            onClick={() => {
                if (isEditingTitle()) {
                    let newCodeFiles = [...ctx?.codeFiles() as CodeFile[]];
                    newCodeFiles[props.fileIndex].title = title();
                    ctx?.setCodeFiles(newCodeFiles);
                }
                setIsEditingTitle(!isEditingTitle());
            }}
          >
            <TextIcon width={4} height={4} />
          </button>

          <button
            class="w-8 h-8 rounded-full bg-blue-600 mb-2 flex items-center justify-center"
            onClick={handleGetValue}
          >
            <PlayIcon width={4} height={4} />
          </button>

          <button
            class="w-8 h-8 rounded-full bg-red-600 mb-2 flex items-center justify-center"
            onClick={props.deleteFn}
          >
            <DeleteIcon width={4} height={4} />
          </button>
        </div>
        <div class="w-11/12">
          <CodeMirror
            onEditorMount={(v: any) => (view = v)}
            onValueChange={onValueChange}
            extensions={[basicSetup, javascript({ typescript: true })]}
            theme={oneDark}
            value={props.codeContent ?? ""}
          />
        </div>
      </div>

      <div>
        <Show when={executed()}>
          <iframe
            class="w-full bg-slate-800 mt-2"
            srcdoc={srcDoc()}
            ref={iframeRef!}
            title="output"
            sandbox="allow-scripts"
          ></iframe>
        </Show>
      </div>
    </div>
  );
};

export default CodeEditor;
