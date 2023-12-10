import {constants, createReadStream, promises, ReadStream} from "fs";
import path from "path";

import FormData from "form-data";

import {GotenbergUtils, PathLikeOrReadStream} from "../../common";
import {LIBRE_OFFICE_EXTENSIONS} from "./constants";
import {PageProperties} from "../interfaces/libre-office.types";

export class LibreOfficeUtils {
    public static async addFiles(files: PathLikeOrReadStream[], data: FormData) {
        for (const [key, file] of files.entries()) {
            const filename = `file${key}`
            if (Buffer.isBuffer(file)) {
                data.append("files", file, filename);
            } else if (file instanceof ReadStream) {
                data.append("files", file, filename);
            } else {
                await promises.access(file, constants.R_OK);
                const filename = path.basename(file.toString());
                const extension = path.extname(filename);
                if (LIBRE_OFFICE_EXTENSIONS.includes(extension)) {
                    data.append("files", createReadStream(file), filename);
                } else {
                    throw new Error(`${extension} is not supported`);
                }
            }
        }
    }

    public static addPageProperties(
        data: FormData,
        pageProperties: PageProperties
    ): void {
        if (pageProperties.landscape) {
            data.append("landscape", String(pageProperties.landscape));
        }

        if (pageProperties.nativePageRanges) {
            GotenbergUtils.assert(
                pageProperties.nativePageRanges.from > 0 &&
                pageProperties.nativePageRanges.to > 0 &&
                pageProperties.nativePageRanges.to >=
                pageProperties.nativePageRanges.from,
                "page ranges syntax error"
            );

            data.append(
                "nativePageRanges",
                `${pageProperties.nativePageRanges.from}-${pageProperties.nativePageRanges.to}`
            );
        }
    }
}
