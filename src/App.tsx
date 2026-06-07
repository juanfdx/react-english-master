import { RouterProvider } from 'react-router'
import { router } from './app/routes'

// Forces Chrome/Safari to load the voice list into memory early
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
}

function App() {

  return <RouterProvider router={router} />
}

export default App