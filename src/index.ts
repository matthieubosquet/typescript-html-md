/**
 * Markdown parser based on the CommonMark Spec
 * See: https://spec.commonmark.org/
 * See also: https://daringfireball.net/projects/markdown/syntax
 */

// TODO Maybe do dl?
// TODO Lists can have paragraphs inside

import { grammar, MDElement, MDSymbol, MDSymbolType } from "./grammar";

type Token = {
    value: string;
    symbol: MDSymbol;
};

function* read(
    markdown: string,
    splitter: string
): IterableIterator<string | undefined> {
    yield* markdown.split(splitter);
}

function currentSymbol(token: string): MDSymbol {
    for (const symbol of grammar) {
        if (token.match(symbol.regex)) {
            return symbol;
        }
    }
    return grammar[grammar.length - 1];
}

function mergeTokens(a: string, b: string): string {
    return a.trim().concat(" ").concat(b.trim()).trim();
}

function applySymbol(token: Token): string {
    return token.symbol.tag
        ? token.symbol.tag.closing
            ? token.symbol.tag.opening
                  .concat(token.value.replace(token.symbol.regex, ""))
                  .concat(token.symbol.tag.closing)
            : token.symbol.tag.opening.concat(
                  token.value.replace(token.symbol.regex, "")
              )
        : token.value.replace(token.symbol.regex, "");
}

function parseLines(markdown: string): Array<Token> {
    const result: Array<Token> = [];

    // Read Markdown line by line
    for (const line of read(markdown.concat("\n"), "\n")) {
        if (typeof line == "undefined") {
            break;
        } else {
            const symbol = currentSymbol(line);
            // Reduce undefined lines
            if (
                result.length > 1 &&
                result[result.length - 1].symbol.element == MDElement.undefined
            ) {
                // Merge undefined
                if (symbol.element == MDElement.undefined) {
                    result[result.length - 1].value = mergeTokens(
                        result[result.length - 1].value,
                        line
                    );
                }
                // Apply h1 suffix
                else if (
                    symbol.element == MDElement.h1 &&
                    symbol.type == MDSymbolType.suffix
                ) {
                    result[result.length - 1].symbol = symbol;
                }
                // Apply h2 suffix
                else if (
                    symbol.element == MDElement.h2 &&
                    symbol.type == MDSymbolType.suffix
                ) {
                    result[result.length - 1].symbol = symbol;
                }
                // Apply p suffix
                else if (
                    symbol.element == MDElement.p &&
                    symbol.type == MDSymbolType.suffix
                ) {
                    result[result.length - 1].symbol = symbol;
                }
            }
            // Reduce unused suffixes
            else if (
                result.length > 1 &&
                symbol.type == MDSymbolType.suffix &&
                result[result.length - 1].symbol.element != MDElement.undefined
            ) {
                result[result.length - 1].value = mergeTokens(
                    result[result.length - 1].value,
                    line
                );
            } else {
                result.push({ value: line, symbol: symbol });
            }
        }
    }

    return result;
}

export function convertMarkdownToHTML(markdown: string): string {
    return parseLines(markdown)
        .map((token) => applySymbol(token))
        .join("\n")
        .concat("\n");
}

const test =
    "# Welcome to the Solid Prototype\n" +
    "  # Welcome to the Solid Prototype\n" +
    "\n \n" +
    "    # Welcome to the Solid Prototype\n" +
    "## This is a prototype implementation of a Solid server\n" +
    "It is a fully functional server,\n\n" +
    "but there are no security or stability guarantees.\n" +
    "undefined\n" +
    "  \t  \n" +
    "=\n" +
    "If you have not already done so, please create an account.\n\n";

console.log(convertMarkdownToHTML(test));
