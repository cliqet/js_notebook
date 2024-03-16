import { Component, For } from "solid-js";
import { AppContext } from "../../context/SessionContext";
import { useContext } from "solid-js";

const Sidebar: Component<{ saveFn: () => void }> = (props) => {
  const ctx = useContext(AppContext);

  return (
    <aside class="w-1/6 bg-slate-700 h-full flex flex-col p-3 text-white">
      <div class="flex flex-row items-center mb-2">
        <h3>Files</h3>

        <button 
          class="w-20 ml-auto h-8 rounded-full bg-slate-600 hover:bg-slate-800 flex items-center justify-center"
          onClick={props.saveFn}
        >Save</button>
      </div>

      <hr />

      <div>
        <ul class="my-2">
          <For each={ctx?.codeFiles()}>
            {(_, i) => (
              <li class="my-2">
                - <span 
                    class="underline cursor-pointer"
                    onClick={() => {
                      let codeBlock = document.getElementById(`codeBlock${i()}`);
                      codeBlock?.scrollIntoView({ 
                        behavior: "smooth",
                        block: "center" 
                      });
                    }}
                  >{ctx?.codeFiles()[i()].title}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
