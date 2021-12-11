import "./App.css"
import { css, Global } from "@emotion/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import QueryForm from "./pages/QueryForm"
import StoreVerify from "./pages/StoreVerify"
import QueryInProgress from "./pages/QueryInProgress"
import Chat from "./pages/Chat"

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        background: #fdfdf2;
        min-height: 100%;
        font-size: 14px;
        font-family: "Inter", sans-serif;
        box-sizing: border-box;
      }
      input {
        font-family: "Inter", sans-serif;
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
          <Route path="/contacting-stores" element={<QueryInProgress />} />
          <Route path="/" element={<QueryForm />} />
          <Route path="1111/chat" element={<Chat/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
