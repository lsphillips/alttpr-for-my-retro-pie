# `alttpr-for-my-retro-pie`

[![Main Build](https://github.com/lsphillips/alttpr-for-my-retro-pie/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/lsphillips/alttpr-for-my-retro-pie/actions)

An [Electron](https://www.electronjs.org/) powered client for [ALTTPR](https://alttpr.com/) that is designed to work with [RetroPie](https://retropie.org.uk/) making randomizing ROMS for configured presets a couple of controller button presses.

## Raspberry Pi Installation

> [!WARNING]
> Electron requires a higher version of `glibc` than what the latest supported RetroPie image uses; therefore this will only work if you [manually install](https://retropie.org.uk/docs/Manual-Installation/) RetroPie on a version of Raspberry Pi OS based on Debian Bullseye or later. This is not officially supported so your mileage may vary.

First, login in to your Raspberry Pi and download the installer by running this command:

``` bash
wget "https://raw.githubusercontent.com/lsphillips/alttpr-for-my-retro-pie/refs/heads/main/retropie-installer.sh" \
  --output-document ~/RetroPie-Setup/scriptmodules/ports/alttpr-for-my-retro-pie.sh \
/
```

> [!TIP]
> The above command assumes that your `RetroPie-Setup` installation is in the user's home directory; if that isn't the case then please adjust accordingly.

Next, create a [configuration file](#configuration) and place it at this location: `~/.config/alttpr-for-my-retro-pie/config.json`.

Finally, you can run the installer by managing packages using `RetroPie-Setup` (it will be listed under experimental ports). Once installed, restart EmulationStation and you will then see `ALTTPR For My Retro Pie` under `Ports`.

> [!TIP]
> When you generate a randomized game ROM using a new preset (where its name is used in the ROM filename) it won't appear in your game list until you restart EmulationStart.

## Configuration

The `alttpr-for-my-retro-pie` application is powered by a JSON configuration file enabling you to configure the following properties:

| Property              | Required | Type                                                  | Default    | Description                                                                                                                                                 |
| --------------------- | :------: | :---------------------------------------------------: | :--------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseRomPath`         | Yes      | `string`                                              |            | The path to a `Zelda no Densetsu: Kamigami no Triforce v1.0` ROM file; normally this would be located in your Retro Pie SNES ROM directory.                 |
| `targetDirectoryPath` | Yes      | `string`                                              |            | The path to the directory where the application will place the randomized ROM files; normally this would by your Retro Pie SNES ROM directory.              |
| `seedPresets`         | Yes      | `array` or `string`                                   |            | Either an array of [presets](#presets) or a URL to a JSON file that is an array or presets.                                                                 |
| `heartSpeed`          | No       | `Off`, `Quater`, `Half`, `Normal`, `Double`           | `Normal`   | Change the speed of the beep when Link is low on health.                                                                                                    |
| `menuSpeed`           | No       | `Instant`, `Slow`, `Normal`, `Fast`                   | `Normal`   | Change the speed of opening and closing the item menu.                                                                                                      |
| `heartColor`          | No       | `Red`, `Green`, `Blue`, `Yellow`                      | `Red`      | Change the color of your hearts.                                                                                                                            |
| `backgroundMusic`     | No       | `boolean`                                             | `true`     | Enable or disable the background music, including MSU-1 playback. MSU-1 users should leave this enabled.                                                    |
| `msu1Resume`          | No       | `boolean`                                             | `true`     | Enables the MSU-1 music resume feature. This feature allows the track that was playing to resume where it left off when re-entering the overworld.          |
| `itemQuickSwap`       | No       | `boolean`                                             | `false`    | Allow items to be changed with the L and R buttons without opening the menu.                                                                                |
| `reduceFlashing`      | No       | `boolean`                                             | `false`    | Severely reduces the intensity of in-game flashing effects, or outright disables them. Please use caution, your photosensitivity to effects may still vary. |

### Presets

A preset is a collection of settings that define how the game should be randomized. A preset object can consist of the following properties:

| Property               | Required | Type                                                                                                        | Default       | Description                                                                            |
| ---------------------- | :------: | :---------------------------------------------------------------------------------------------------------: | :-----------: | -------------------------------------------------------------------------------------- |
| `name`                 | Yes      | `string`                                                                                                    |               | The name of the preset. This will be used in the file name of the randomized ROM file. |
| `goal`                 | No       | `Standard`, `FastGanon`, `Dungeons`, `Pedestal`, `TriforceHunt`, `GanonHunt`, `Completionist`               | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#goal)                       |
| `world`                | No       | `Standard`, `Open`, `Inverted` `Retro`                                                                      | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#world_state)                |
| `crystalsForGanon`     | No       | `0` - `7`                                                                                                   | `7`           | [Refer to the documentation](https://alttpr.com/en/options#ganon_open)                 |
| `crystalsForTower`     | No       | `0` - `7`                                                                                                   | `7`           | [Refer to the documentation](https://alttpr.com/en/options#tower_open)                 |
| `itemAccessibility`    | No       | `Inventory`, `Locations`,`Beatable`                                                                         | `Inventory`   | [Refer to the documentation](https://alttpr.com/en/options#accessibility)              |
| `itemPlacement`        | No       | `Basic`, `Advanced`                                                                                         | `Basic`       | [Refer to the documentation](https://alttpr.com/en/options#item_placement)             |
| `itemFunctionality`    | No       | `Standard`, `Hard`, `Expert`                                                                                | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#item_functionality)         |
| `itemPool`             | No       | `Standard`, `Hard`, `Expert`                                                                                | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#item_pool)                  |
| `swords`               | No       | `Standard`, `Assured`, `None`, `Random`                                                                     | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#weapons)                    |
| `dungeonItemShuffling` | No       | `Standard`, `MapsCompasses`, `MapsCompassesSmallKeys`, `Keysanity`                                          | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#accessibility)              |
| `bossShuffling`        | No       | `Standard`, `Simple`, `Full`,  `Random`                                                                     | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#bosses)                     |
| `entranceShuffling`    | No       | `Standard`, `Simple`, `Restricted`, `Full`, `Crossed`, `Insanity`                                           | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#entrance_shuffle)           |
| `enemyShuffling`       | No       | `Standard`, `Shuffled`, `Random`                                                                            | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#enemy_shuffle)              |
| `enemyDamage`          | No       | `Standard`, `Shuffled`, `Random`                                                                            | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#enemy_damage)               |
| `enemyHealth`          | No       | `Standard`, `Easy`, `Hard`, `Expert`                                                                        | `Standard`    | [Refer to the documentation](https://alttpr.com/en/options#enemy_health)               |
| `hints`                | No       | `boolean`                                                                                                   | `true`        | [Refer to the documentation](https://alttpr.com/en/options#hints)                      |

## Development

First copy the contents of the `config.sample.json` file into a `config.json` file and change the `baseRomPath` property value to a absolute path to a `Zelda no Densetsu: Kamigami no Triforce v1.0` ROM on your machine.

Next place the resulting `config.json` file in the user data location for this application:

| System  | Location                                                    |
| ------- | ----------------------------------------------------------- |
| Windows | `%APPDATA%/alttpr-for-my-retro-pie/config.json`             |
| Linux   | `~/.config/alttpr-for-my-retro-pie/config.json`             |
| Mac     | `~/Library/Application/alttpr-for-my-retro-pie/config.json` |

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

Next, to create an arm64 Linux package in the `packages` directory, run this command:

``` bash
npm run package
```

Finally, to create a `.deb` installer in the `installers` directory, run this command:

``` bash
npm run installer
```

> [!IMPORTANT]
> Creating an installer should be performed in a Linux environment. Please see the [requirements](https://github.com/electron-userland/electron-installer-debian#requirements) for the `electron-installer-debian` tool.

## License

This project is released under the [MIT license](LICENSE.txt).
