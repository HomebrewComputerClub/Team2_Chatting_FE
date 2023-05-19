import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
}

.topbar {
	height: 50px;
	background-color: white;
	position: fixed;
	top: 0;
	width: 100%;
	transition: background-color 0.3s ease-in-out;
}

.topbar.scrolled {
	background-color: #212121;
}
.search-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.search-box input[type="text"] {
  border: none;
  flex: 1;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  outline: none;
}

.search-box button {
  border: none;
  background-color: #f7941e;
  color: #fff;
  border-radius: 50%;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.search-box button[type="submit"]:hover {
  background-color: #e67e22;
}
`;
