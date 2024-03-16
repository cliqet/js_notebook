import { Accessor, ParentComponent, Setter, createContext, createSignal } from "solid-js";

export type CodeFile = {
    title: string;
    code: string;
}

type ContextType = {
    codeFiles : Accessor<CodeFile[]>;
    setCodeFiles : Setter<CodeFile[]>;
}

export const AppContext = createContext<ContextType>();

export const AppContextProvider: ParentComponent = (props) => {
    const [codeFiles, setCodeFiles] = createSignal<CodeFile[]>([]);

    return (
        <AppContext.Provider value={{ codeFiles, setCodeFiles }}>
            {props.children}
        </AppContext.Provider>
    );
}