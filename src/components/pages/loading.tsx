import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../logo.svg";

const Loading = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p color="#3C4F18">Version 2.1</p>
        <CircularProgress color="primary" />
      </header>
    </div>
  );
};

export default Loading;
