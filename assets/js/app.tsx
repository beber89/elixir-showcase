import React from "react";

interface AppProps {
  name: string;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const name = props.name;
  return (
    <section className="phx-hero">
      <h1>Welcome to {name} with Typescript and React!</h1>
      <p>
        A productive web framework that
        <br />
        does not compromise speed or maintainability.
      </p>
    </section>
  );
};

export default App;