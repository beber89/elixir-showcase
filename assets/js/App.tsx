import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth';

interface AppProps {
  args: [string];
}

const App: React.FC<AppProps> = (_props: AppProps) => {
  // const name = props.name;
  return (
    <Router>
      <Route path="/" exact component={Auth} />
    </Router>
  );
};

export default App;