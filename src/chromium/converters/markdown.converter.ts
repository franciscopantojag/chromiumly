import FormData from "form-data";

import {GotenbergUtils, PdfFormat, PathLikeOrReadStream} from "../../common";
import {
    EmulatedMediaType,
    PageProperties,
} from "../interfaces/converter.types";
import {ConverterUtils} from "../utils/converter.utils";
import {Converter} from "./converter";
import {ChromiumRoute} from "../../main.config";

/**
 * Class representing a Markdown converter that extends the base Converter class.
 * This class is used to convert HTML with markdown content to PDF using Gotenberg service.
 *
 * @extends Converter
 */
export class MarkdownConverter extends Converter {
    /**
     * Creates an instance of MarkdownConverter.
     * Initializes the converter with the Markdown conversion route.
     */
    constructor() {
        super(ChromiumRoute.MARKDOWN);
    }

    /**
     * Converts HTML with markdown content to PDF.
     *
     * @param {Object} options - Conversion options.
     * @param {PathLikeOrReadStream} options.html - PathLike or ReadStream of the HTML content to be converted.
     * @param {PathLikeOrReadStream} options.markdown - PathLike or ReadStream of the Markdown content to be converted.
     * @param {PathLikeOrReadStream} [options.header] - PathLike or ReadStream of the header HTML content.
     * @param {PathLikeOrReadStream} [options.footer] - PathLike or ReadStream of the footer HTML content.
     * @param {PageProperties} [options.properties] - Page properties for the conversion.
     * @param {PdfFormat} [options.pdfFormat] - PDF format options.
     * @param {boolean} [options.pdfUA] - Indicates whether to generate PDF/UA compliant output.
     * @param {EmulatedMediaType} [options.emulatedMediaType] - Emulated media type for the conversion.
     * @param {string} [options.waitDelay] - Delay before the conversion process starts.
     * @param {string} [options.waitForExpression] - JavaScript expression to wait for before completing the conversion.
     * @param {string} [options.userAgent] - User agent string to use during the conversion.
     * @param {Record<string, string>} [options.extraHttpHeaders] - Additional HTTP headers for the conversion.
     * @param {boolean} [options.failOnConsoleExceptions] - Whether to fail on console exceptions during conversion.
     * @returns {Promise<Buffer>} A Promise resolving to the converted PDF content as a Buffer.
     */
    async convert({
                      html,
                      markdown,
                      header,
                      footer,
                      properties,
                      pdfFormat,
                      pdfUA,
                      emulatedMediaType,
                      waitDelay,
                      waitForExpression,
                      userAgent,
                      extraHttpHeaders,
                      failOnConsoleExceptions,
                  }: {
        html: PathLikeOrReadStream;
        markdown: PathLikeOrReadStream;
        header?: PathLikeOrReadStream;
        footer?: PathLikeOrReadStream;
        properties?: PageProperties;
        pdfFormat?: PdfFormat;
        pdfUA?: boolean;
        emulatedMediaType?: EmulatedMediaType;
        waitDelay?: string;
        waitForExpression?: string;
        userAgent?: string;
        extraHttpHeaders?: Record<string, string>;
        failOnConsoleExceptions?: boolean;
    }): Promise<Buffer> {
        const data = new FormData();

        await ConverterUtils.addFile(data, html, "index.html");

        await ConverterUtils.addFile(data, markdown, "file.md");

        await ConverterUtils.customize(data, {
            header,
            footer,
            properties,
            pdfFormat,
            pdfUA,
            emulatedMediaType,
            waitDelay,
            waitForExpression,
            userAgent,
            extraHttpHeaders,
            failOnConsoleExceptions,
        });

        return GotenbergUtils.fetch(this.endpoint, data);
    }
}