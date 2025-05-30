import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Testing Tailwind CSS v4.0
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Counter Test</h2>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Count: {count}
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Test v4.0 features */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-2">Tailwind v4.0 Features</h3>
          <p>If you can see this styled properly, Tailwind is working!</p>
          
          {/* Test dynamic values (v4.0 feature) */}
          <div className="mt-4 w-17 h-17 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default App