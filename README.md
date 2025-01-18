# `alttpr-for-my-retro-pi`

[![Built using GitHub Action](https://github.com/lsphillips/alttpr/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/lsphillips/alttpr-for-my-retro-pi/actions)

An [Electron](https://www.electronjs.org/) powered client for [ALTTPR](https://alttpr.com/) that is designed to work with [RetroPie](https://retropie.org.uk/) making randomizing ROMS for configured presets a couple of controller button presses.

## Installation

Working on it.

## Development

First copy the contents of the `config.sample.json` file into a `config.json` file and change the `baseRomPath` property value to a path to a `Zelda no Densetsu: Kamigami no Triforce v1.0` ROM on your machine.

Next, to start a process that will watch for renderer process code changes, run this command:

``` bash
npm run develop
```

Next, in a seperate process, set the `DEBUG_ALTTPR_FOR_MY_PI` environment variable:

``` bash
export DEBUG_ALTTPR_FOR_MY_PI=1
```

Finally, to run the application, run this command:

``` bash
npm run start
```

If you perform changes to renderer process code then press the `F5` key to reload and see those changes reflected in the application. However any changes made to main process code or preload scripts will require you to restart the application.

### Code Quality

To perform code quality checks, powered by ESLint, run this command:

``` bash
npm run lint
```

### Dependencies

All dependencies that are used for building and testing should be added as a development dependency; this includes dependencies required by the renderer process as they are bundled into the artifact.

Only dependencies required by the main process should be made a production dependency to minimize the final package size.

## Building

First, to build a bundle in the `build` directory that is ready to be packaged, run this command:

``` bash
npm run build
```

Next, to create an arm64 Linux package in the `artifact` directory, run this command:

``` bash
npm run package
```

Finally, to create a `.deb` installer in the `artifact` directory, run this command:

``` bash
npm run installer
```

**Please Note:** Creating an installer should be performed in a Linux environment. Please see the [requirements](https://github.com/electron-userland/electron-installer-debian#requirements) for the `electron-installer-debian` tool.

