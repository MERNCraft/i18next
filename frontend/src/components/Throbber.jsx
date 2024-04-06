import React from 'react';
import '../css/throbber.css'

// Throbber code by Daria Koutevska
// Licence: MIT
// Source:  https://codepen.io/DariaIvK/details/EpjPRM


export const Throbber = () => (
  <div id="throbber">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)
