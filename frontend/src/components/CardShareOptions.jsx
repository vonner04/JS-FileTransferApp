import React from "react";
import EnterCode from "./buttons/EnterCode";
import GenerateCode from "./buttons/GenerateCode";

function CardShareOptions() {
  return (
    <>
      {/* Add a simple text that describes the app's purpose
       beside the card share options. */}
      {/* Add dynamic rendering for what card will look like when EnterCode button is pressed
      or when Generate Code button is pressed.*/}
      <EnterCode />
      <GenerateCode />
    </>
  );
}

export default CardShareOptions;
