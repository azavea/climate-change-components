# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
