import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../logo.svg";

const Loading = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Version 2</p>
        <CircularProgress color="inherit" />
      </header>
    </div>
  );
};

export default Loading;
