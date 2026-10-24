import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="starter-shell">
      <section className="starter-card" aria-labelledby="starter-title">
        <p className="starter-kicker">Starter App</p>
        <h1 id="starter-title">React + Vite + TypeScript</h1>
        <p>
          Your previous application code has been removed. This is a clean
          starter baseline that keeps your existing project configuration.
        </p>

        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="starter-button"
        >
          Count is {count}
        </button>
      </section>
    </main>
  )
}

export default App
