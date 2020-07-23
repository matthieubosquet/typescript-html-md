/**
 * A definition of the Markdown grammar
 */
// Do you really need to export types?
export type MDSymbol = {
    regex: RegExp;
    element: MDElement;
    type: MDSymbolType;
    tag?: MDTag;
    description?: string;
};

export type MDTag = {
    opening: string;
    closing?: string;
    attributes?: Array<MDTagAttribute>;
};

export type MDTagAttribute = {
    type: string;
    value: string;
};

export enum MDElement {
    pre,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    blockquote,
    ul,
    ol,
    table,
    // Inline
    code,
    a,
    em,
    strong,
    // Default
    p,
    undefined
}

export enum MDSymbolType {
    prefix,
    suffix,
    undefined
}

export const grammar: Array<MDSymbol> = [
    {
        regex: /^([ ]{4,}|\t+)\s*[^\s]/,
        element: MDElement.pre,
        tag: { opening: "<pre>", closing: "</pre>" },
        type: MDSymbolType.prefix,
        description: "4 spaces or a tab followed by a non-whitespace character"
    },
    {
        regex: /^[ ]{0,3}# /,
        element: MDElement.h1,
        tag: { opening: "<h1>", closing: "</h1>" },
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}=\s*$/,
        element: MDElement.h1,
        tag: { opening: "<h1>", closing: "</h1>" },
        type: MDSymbolType.suffix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}## /,
        element: MDElement.h2,
        tag: { opening: "<h2>", closing: "</h2>" },
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}-\s*$/,
        element: MDElement.h2,
        tag: { opening: "<h2>", closing: "</h2>" },
        type: MDSymbolType.suffix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}### /,
        element: MDElement.h3,
        tag: { opening: "<h3>", closing: "</h3>" },
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}#### /,
        element: MDElement.h4,
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}##### /,
        element: MDElement.h5,
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^[ ]{0,3}###### /,
        element: MDElement.h6,
        type: MDSymbolType.prefix,
        description: ""
    },
    {
        regex: /^\s*$/,
        element: MDElement.p,
        tag: { opening: "<p>", closing: "</p>" },
        type: MDSymbolType.suffix,
        description: "Any number of whitespace characters."
    },
    {
        regex: /^(.*?)$/,
        element: MDElement.undefined,
        type: MDSymbolType.undefined,
        description: "Any string, even empty (the default)."
    }
];
