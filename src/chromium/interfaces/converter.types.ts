import {PathLikeOrReadStream, PdfFormat} from "../../common";

type PageSize = {
    width: number; // Paper width, in inches (default 8.5)
    height: number; //Paper height, in inches (default 11)
};

type PageMargins = {
    top: number; // Top margin, in inches (default 0.39)
    bottom: number; // Bottom margin, in inches (default 0.39)
    left: number; // Left margin, in inches (default 0.39)
    right: number; // Right margin, in inches (default 0.39)
};

export type PageProperties = {
    size?: PageSize;
    margins?: PageMargins;
    preferCssPageSize?: boolean; // Define whether to prefer page size as defined by CSS (default false)
    printBackground?: boolean; // Print the background graphics (default false)
    omitBackground?: boolean; // Hide the default white background and allow generating PDFs with transparency (default false)
    landscape?: boolean; // Set the paper orientation to landscape (default false)
    scale?: number; // The scale of the page rendering (default 1.0)
    nativePageRanges?: { from: number; to: number }; // Page ranges to print
};

export type EmulatedMediaType = "screen" | "print";


export type ConversionOptions = {
    header?: PathLikeOrReadStream;
    footer?: PathLikeOrReadStream;
    properties?: PageProperties;
    pdfFormat?: PdfFormat;
    pdfUA?: boolean; // Enable PDF for Universal Access for optimal accessibility (default false)
    emulatedMediaType?: EmulatedMediaType;
    waitDelay?: string; // Duration (e.g, '5s') to wait when loading an HTML document before converting it into PDF
    waitForExpression?: string; // JavaScript's expression to wait before converting an HTML document into PDF until it returns true.
    userAgent?: string;
    extraHttpHeaders?: Record<string, string>;
    failOnConsoleExceptions?: boolean; // Return a 409 Conflict response if there are exceptions in the Chromium console (default false)
};
