import "./App.css"
import { css, Global } from "@emotion/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import QueryForm from "./pages/QueryForm"
import StoreVerify from "./pages/StoreVerify"
import QueryInProgress from "./pages/QueryInProgress"
import ChatsHome from "./pages/ChatsHome"
import Chat, { WrappedComponent } from "./pages/Chat"
import StoreCategoryImages from "./pages/StoreCategoryImages/StoreCategoryImages"

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

function App() {
  return (
    <div className="App">
      {globalStyles}
      <Router>
        <Routes>
          <Route path="/onboard/:storeIdentifier" element={<StoreVerify />} />
          <Route
            path="/resource/:resourceId/category-images/:categoryId"
            element={<StoreCategoryImages />}
          />
          <Route path="/users" element={<QueryForm />} />
          <Route
            path="/users/contacting-stores"
            element={<QueryInProgress />}
          />
          <Route path="/" element={<QueryForm />} />
          <Route path="/chats" element={<ChatsHome />} />
          <Route path="/chat/:chatId" element={<WrappedComponent/>} />
          <Route path="/chat/:chatId/customer/:customerId" element={<WrappedComponent/>} />
          <Route path="/chat/:chatId/shop/:shopId" element={<WrappedComponent/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
