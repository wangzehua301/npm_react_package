import React, { useState } from "react";

/**
 * A simple HelloWorld component that renders a title and a button. Clicking the
 * button counts up a number and rerenders the component
 */
export const HelloWorld = () => {
  // Number of current clicks
  const [clicks, setClicks] = useState<number>(1);

  // Handler for when user clicks the button
  const tick = () => {
    setClicks(clicks + 1);
    const p = new Promise((resolve,reject) => {
        setTimeout(resolve)
    })
    console.log('wzh')
  };

  // Renders the view
  return (
    <div>
      <h1>Hello World {clicks}</h1>
      <button onClick={() => tick()}>Click me!</button>
    </div>
  );
};