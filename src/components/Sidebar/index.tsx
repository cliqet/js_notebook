import { Component } from "solid-js";

const Sidebar: Component<{ saveFn: () => void}> = (props) => {
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
          <li class="my-2">
            <a href="">- <span class="underline">File1</span></a>
          </li>
          <li class="my-2">
            <a href="">- <span class="underline">File1</span></a>
          </li>
          <li class="my-2">
            <a href="">- <span class="underline">File1</span></a>
          </li>
          <li class="my-2">
            <a href="">- <span class="underline">File1</span></a>
          </li>
          <li class="my-2">
            <a href="">- <span class="underline">File1</span></a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
