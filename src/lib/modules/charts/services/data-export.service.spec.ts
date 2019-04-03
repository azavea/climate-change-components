import { DataExportService } from './data-export.service';


describe('DataExportService', () => {

    let service: DataExportService;

    beforeEach(() => {
        service = new DataExportService();
    });

    it('should have a downloadAsJSON method', () => {
        expect(service.downloadAsJSON).toBeDefined();
    });
});
