import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>发票助手</h1>
        <p>正在加载全国增值税发票查验平台...</p>
      </header>
      <main className="app-main">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </main>
    </div>
  )
}

export default App
