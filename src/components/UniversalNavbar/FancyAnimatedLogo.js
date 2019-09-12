import React from "react";

import fancyE from "./assets/fancy-e.js";
import fancyT from "./assets/fancy-t.js";
import fancyH from "./assets/fancy-h.js";
import fancyO from "./assets/fancy-o.js";
import fancyS from "./assets/fancy-s.js";

const FancyAnimatedLogo = props => {
  return (
    <div
      role="img"
      aria-label="Ethos"
      style={{ position: "relative", width: 86.6, height: 16 }}
    >
      {fancyE({ className: "letter fancyE", alt: "" })}
      {fancyT({ className: "letter fancyT", alt: "" })}
      {fancyH({ className: "letter fancyH", alt: "" })}
      {fancyO({ className: "letter fancyO", alt: "" })}
      {fancyS({ className: "letter fancyS", alt: "" })}
    </div>
  );
};

export default FancyAnimatedLogo;
