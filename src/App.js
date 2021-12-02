import "./App.css"
import { css, Global } from "@emotion/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import QueryForm from "./pages/QueryForm"
import StoreVerify from "./pages/StoreVerify"

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        background: #ffffff;
        min-height: 100%;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, “Roboto”,
          “Oxygen”, “Ubuntu”, “Cantarell”, “Fira Sans”, “Droid Sans”,
          “Helvetica Neue”, sans-serif;
        box-sizing: border-box;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
)

function App() {
  return (
    <div className="App">
      {globalStyles}
      <Router>
        <Routes>
          <Route path="/onboard" element={<StoreVerify />} />
          <Route path="/users" element={<QueryForm />} />
          <Route path="/" element={<QueryForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
