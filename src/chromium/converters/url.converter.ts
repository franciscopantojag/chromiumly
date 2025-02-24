import {URL} from "url";
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
 * Class representing a URL converter that extends the base Converter class.
 * This class is used to convert content from a URL to PDF using Gotenberg service.
 *
 * @extends Converter
 */
export class UrlConverter extends Converter {
    /**
     * Creates an instance of UrlConverter.
     * Initializes the converter with the URL conversion route.
     */
    constructor() {
        super(ChromiumRoute.URL);
    }

    /**
     * Converts content from a URL to PDF.
     *
     * @param {Object} options - Conversion options.
     * @param {string} options.url - The URL of the content to be converted to PDF.
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
                      url,
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
        url: string;
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
        const _url = new URL(url);
        const data = new FormData();

        data.append("url", _url.href);

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