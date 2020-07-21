import { convertMarkdownToHTML } from "./index";

const MARKDOWN =
    "# Welcome to the Solid Prototype\n" +
    "## This is a prototype implementation of a Solid server\n" +
    "It is a fully functional server,\n" +
    "but there are no security or stability guarantees.\n" +
    "\n" +
    "If you have not already done so, please create an account.";

const HTML =
    "<h1>Welcome to the Solid Prototype</h1>\n" +
    "<h2>This is a prototype implementation of a Solid server</h2>\n" +
    "<p>It is a fully functional server, but there are no security or stability guarantees.</p>\n" +
    "<p>If you have not already done so, please create an account.</p>\n";

test(`convertToHTML(MARKDOWN) to return md`, () => {
    expect(convertMarkdownToHTML(MARKDOWN)).toBe(HTML);
});
