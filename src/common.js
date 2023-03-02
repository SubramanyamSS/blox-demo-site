import { createGlobalStyle } from "styled-components";
import SourceSansRegular from "./static/fonts/SourceSansPro-Regular.ttf";
import SourceSansSemiBold from "./static/fonts/SourceSansPro-SemiBold.ttf";

const Global = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-width: 1240px !important;
        /*background-color: #f8f8f8 !important;*/
        background-color: #FFFFFF !important;
        overflow: auto !important;
        height: auto !important;
        padding-bottom: 40px;
    }
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
    @font-face {
        font-family: 'SourceSansPro-Regular';
        src: url('${SourceSansRegular}') format("truetype")
    }
    @font-face {
        font-family: 'SourceSansPro-SemiBold';
        src: url('${SourceSansSemiBold}') format("truetype")
    }

    // Carousel slick css starts
    .slick-prev:before,
    .slick-next:before {
        -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS43NyAyOC45NyI+PHRpdGxlPkFycm93czwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBkPSJNMTQuMjUsMGwxLjUyLDEuNjVMMy4xLDE0LjU3LDE1LjcyLDI3LjQzLDE0LjA5LDI5LDAsMTQuNTdaIi8+PC9nPjwvZz48L3N2Zz4=);
        content: '' !important;
        width: 50%;
        height: 50%;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        display: block;
        background: #fff;
        margin: auto;
        opacity: 1 !important;
    }
    .slick-prev,
    .slick-next {
        /*background-color: #000 !important;*/
        width: 28px !important;
        height: 28px !important;
        border-radius: 100%;
        margin: 0 -4px;
    }
    .slick-next {
        transform: translate(0, -50%) rotate(180deg) !important;
    }
    .slick-slider .slick-list {
        margin: 0px 5px;
    }
    .slick-disabled {
        background-color: #e2e2e2 !important;
    }
    .slick-slide img {
        margin: auto;
    }
    .slick-track {
        margin-left: inherit !important;
    }
    // Carousel slick css ends
`;

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const deleteCookie = (cname) => {
  document.cookie = cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// taken from demo site code
const generate_uuid = (n) => {
  return (
    n +
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
};

const capitalize = (s) => {
  return s[0] ? s[0].toUpperCase() + s.slice(1) : "";
};

/**
 * Determines if empty.
 *
 * @param      {string}   value   The value
 * @return     {boolean}  True if empty, False otherwise.
 */
const isEmpty = (value) =>
  value === "" ||
  value === undefined ||
  value === null ||
  typeof value === "undefined";

const isValidHttpUrl = (string) => {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export {
  Global,
  getCookie,
  setCookie,
  deleteCookie,
  generate_uuid,
  isEmpty,
  capitalize,
  isValidHttpUrl,
  canUseDOM,
};
