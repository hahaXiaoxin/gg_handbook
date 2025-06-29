import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>React + Vite</h1>
        <p>成功初始化项目</p>
      </header>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          计数器: {count}
        </button>
        <p>
          编辑 <code>src/App.tsx</code> 并保存以测试热更新
        </p>
      </div>
    </div>
  )
}

export default App 