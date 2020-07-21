// 4 types grammar
// Type-0 turing complete
// Type-1 context-sensitive
// Type-2 context-free
// Type-3 regular

// const symbols = [
//     { symbol: /#/, translation: "h1" },
//     { symbol: /##/, translation: "h2" },
//     { symbol: /.*/, translation: "p" }
// ];

const MARKDOWN =
    "# Welcome to the Solid Prototype\n" +
    "## This is a prototype implementation of a Solid server\n" +
    "It is a fully functional server,\n" +
    "but there are no security or stability guarantees.\n" +
    "\n" +
    "If you have not already done so, please create an account.";

// const HTML =
//     "<h1>Welcome to the Solid Prototype</h1>\n" +
//     "<h2>This is a prototype implementation of a Solid server</h2>\n" +
//     "<p>It is a fully functional server, but there are no security or stability guarantees.</p>\n" +
//     "<p>If you have not already done so, please create an account.</p>\n";

export function convertMarkdownToHTML(markdown: string = MARKDOWN): string {
    return markdown
        .split("\n")
        .filter((x) => x)
        .map((x) => {
            if (x.match(/##/)) {
                return "<h2>".concat(x.slice(3)).concat("</h2>\n");
            } else if (x.match(/#/)) {
                return "<h1>".concat(x.slice(2)).concat("</h1>\n");
            }
            return "<p>".concat(x).concat("</p>\n");
        })
        .reduce((previousValue, currentValue, currentIndex) => {
            return (previousValue += currentValue);
        });
}

console.log(convertMarkdownToHTML());
