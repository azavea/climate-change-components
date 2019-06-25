import { Injectable } from '@angular/core';
import * as SaveSvg from 'save-svg-as-png';

/*
 * Generates image of D3 chart SVG for download
 */
@Injectable({providedIn: 'root'})
export class ImageExportService {

    /**
     * Options to pass when converting SVG to PNG
     *
     * @param parentSelector - Name of parent of chart, used to rewrite CSS selectors
     */
    private chartOptions(parentSelector: string) {
        return {
            backgroundColor: 'white',
            selectorRemap(selector) {
                // find CSS selectors mapped to parent chart
                return selector.replace(parentSelector, '');
            }
        };
    }

    /**
     * Converts chart SVG to PNG and downloads it.
     *
     * @param indicatorName - Name of indicator, used for SVG selector
     * @param fileName - File name for download, will be suffixed with extension
     */
    public downloadAsPNG(indicatorName: string, fileName: string, selector: string): void {
        const filename: string = fileName + '.png';
        const svg: HTMLElement = document.getElementById('chart-' + indicatorName);
        // SVG might not be found if chart hasn't loaded yet
        if (!svg) { return; }

        SaveSvg.saveSvgAsPng(svg, filename, this.chartOptions(selector));
    }
}
