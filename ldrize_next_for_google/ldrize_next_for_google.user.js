// ==UserScript==
// @name         LDRize Next for Google
// @namespace    https://github.com/yuki-ycino
// @version      0.4
// @author       Yuki Yano, takker
// @include       /^https://www.google.com/search?.*/
// ==/UserScript==
(async () => {
  "use strict";
  const {manager} = await import('https://github.com/takker99/gm_scripts/raw/master/ldrize_next_for_google/manager.js');

  manager.start();
})();


