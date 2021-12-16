import "./App.css"
import { css, Global } from "@emotion/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import QueryForm from "./pages/QueryForm"
import StoreVerify from "./pages/StoreVerify"
import QueryInProgress from "./pages/QueryInProgress"
import Chat from "./pages/Chat"
import { useLocation, useParams } from "react-router";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        background: #f8f3fd;
        min-height: 100%;
        font-size: 14px;
        font-family: "Inter", sans-serif;
        box-sizing: border-box;
        color: #333333;
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

export const WrappedComponent = props => {
    const { chatId } = useParams()
  return <Chat chatId = {chatId} />
}


function App() {
  return (
    <div className="App">
      {globalStyles}
      <Router>
        <Routes>
          <Route path="/onboard/:storeIdentifier" element={<StoreVerify />} />
          <Route path="/users" element={<QueryForm />} />
          <Route
            path="/users/contacting-stores"
            element={<QueryInProgress />}
          />
          <Route path="/" element={<QueryForm />} />
          <Route path="/chat/:chatId" element={<WrappedComponent/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
