import { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const ContextA = createContext<{ a: number }>({ a: 0 });

function ComponentA(props: { name: string }) {
    const [a, setA] = useState(0);
    const context = useContext(ContextA);
	const context2 = useContext(ContextA);

    useEffect(() => {
        console.log(props.name, '组件挂载了');
        return () => {
            console.log(props.name, '组件卸载了');
        }
    }, []);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, border: '1px solid #aaa', padding: 10}}>
            <p>context.a: {context.a}</p>
			<p>context2.a: {context2.a}</p>
            <p>{props.name} 的数量为 {a}</p>
            <button onClick={() => setA(a + 1)}>增加</button>
        </div>
    );
}

function ComponentB() {
	return (
		<div>
			{ ComponentA({ name: "B (直接调用)" }) }
			{ ComponentA({ name: "C (直接调用)" }) }
		</div>
	)
}

function ATag() {
    const [contextValue, setContextValue] = useState({a: 123});
    const [show, setShow] = useState(true);

    const directCallResult = show ? <ComponentB /> : null;

    return (
        <ContextA.Provider value={contextValue}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
                <h2>JSX 标签方式（推荐）</h2>
                {show && <ComponentA name="A (JSX标签)" />}

                <h2>直接函数调用（不推荐）</h2>
                {directCallResult}
                
                <button onClick={() => setContextValue({a: contextValue.a + 1})}>
                    点击让 context.a 加一
                </button>
				
                <button onClick={() => setShow(s => !s)}>
                    切换显示/隐藏组件
                </button>
            </div>
        </ContextA.Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<ATag />);
