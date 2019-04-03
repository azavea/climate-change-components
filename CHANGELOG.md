# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]

## [0.4.0]
### Added
- Added `DataExportService` and `ImageDownloadService` to enable graph image downloads from Temperate.

## [0.3.1]
- Added new `...IndicatorDistanceQueryParams` types for providing an optional `distance: number` parameter for Lat/Lon climate data queries.

## [0.3.0]
### Breaking Change
- IndicatorQueryOpts no longer contains the `city: City` property
- IndicatorService.getData method signature is now `(city: City, options: IndicatorQueryOpts)`. This was done to simplify types and maintain consistency with the new IndicatorService method for lat/lon requests.
### Added
- `IndicatorService.getDataForLatLon(point: Point, options: IndicatorQueryOpts)`. This method supports querying via the new API endpoint added for lat/lon requests.

## 0.2.15
- Make line graph data scrubber compatible for evergreen browsers

## 0.2.14
- Export cache service for public use

## 0.2.13
- Export ModelModalComponent for direct use outside of this library
- Rework ModelModalComponent filtering and hiding behavior to avoid triggering updates when parent chart has been removed from DOM

## 0.2.12
- Use scenario alias as toggle button label

## 0.2.11
### Fixed
- Switched to using peerDependencies for Angular & Angular libraries

## 0.2.10
### Fixed
- Fix broken build caused by Travis regression

## 0.2.9
### Fixed
- Initialize model modal with empty list

## 0.2.8
### Fixed
- Re-add removed ModelModalComponent.modalShow method to fix stale model list on modal open

## 0.2.7

DEPRECATED: Use 0.2.8 instead, this build introduces a regression in ModelModalComponent

### Fixed
- Removed ModelModalComponent.modalShow() method in template breaking AOT build

## 0.2.6

DEPRECATED: Use 0.2.8 instead, this build will fail to AOT compile

### Fixed
- IndicatorService.getData no longer passes an empty `models` query parameter
- ModelModalComponent no longer unnecessarily requests data when opening modal

## [0.2.5]
### Fixed
- Made ModelModalComponent.modalOptions public to fix AOT builds

## [0.2.4]
### Fixed
- Removed imports with side effects that could lead to a bug in type checking observables in the caching service implemented in 0.2.3

## [0.2.3]
### Added
- The following services now use an in-memory cache for their `list()` methods to reduce network traffic:
  - ClimateModelService
  - DatasetService
  - HistoricRangeService
  - IndicatorService
  - ScenarioService
### Changed
- A BsModalOptions configuration can now be passed to ModelModalComponent via the `[config]` binding

## [0.2.2]
### Changed
- HistoricPercentile extra param now limited to a list of dropdown choices: 1, 5, 95, 99
- PercentileHistoricComponent and HistoricComponent now automatically choose a sensible dropdown
  default for the historic baseline parameter
### Fixed
- Extreme Cold Events is now properly classified as both a historic and percentile Indicator

## [0.2.1] - 2017-11-07
### Added
- PercentileHistoricComponent, which controls both historic range and percentile extra parameters

### Changed
- Precipitation threshold units, which are now rates in the API

## [0.2.0] - 2017-11-03
### Added
- ChartsModule, which exports components useful for creating time series charts via the Climate API
- CHANGELOG

## [0.1.0] - 2017-10-26
### Added
- Initial Release
- ApiModule, which exports a public interface for using the Climate API in Angular
