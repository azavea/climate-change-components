import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

/*
 * Generates JSON from data
 */
@Injectable()
export class DataExportService {

    public downloadAsJSON(filename: string, data: any): void {
        this.downloadFile(JSON.stringify(data), filename, 'application/json');
    }

    private downloadFile(data: string, title: string, mime: string): void {
        FileSaver.saveAs(new File([data], title, {type: mime + ';charset=utf-8'}));
    }
}
