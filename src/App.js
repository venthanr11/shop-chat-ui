import "./App.css"
import { css, Global } from "@emotion/react"
import QueryForm from "./pages/QueryForm"

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
      <QueryForm />
    </div>
  )
}

export default App
