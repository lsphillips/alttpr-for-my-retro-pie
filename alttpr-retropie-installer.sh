#!/usr/bin/env bash

rp_module_id="alttpr"
rp_module_desc="An Electron powered client for ALTTPR that is designed to work with RetroPie making randomizing ROMS for configured presets a couple of controller button presses."
rp_module_licence=""
rp_module_section="exp"

function depends_alttpr() {
    getDepends xorg matchbox
}

function install_bin_alttpr() {
    # eval wget $(curl -s https://api.github.com/repos/lsphillips/alttpr-for-my-retro-pi/releases/latest | grep debian_installer | cut -d : -f 2,3)
	aptInstall ./RetroPie-Setup/scriptmodules/ports/alttpr.deb
}

function configure_alttpr() {
	mkRomDir "ports"
    mkdir -p "$md_inst"
    moveConfigDir "$home/.config/$md_id" "$md_conf_root/ports/$md_id"

    cat >"$md_inst/alttpr.sh" << _EOF_
#!/bin/bash
xset -dpms s off s noblank
matchbox-window-manager -use_titlebar no &
/usr/bin/alttpr-for-my-retro-pi
_EOF_

	chmod +x "$md_inst/alttpr.sh"

	addPort "$md_id" "alttpr" "ALTTPR Client" "XINIT: $md_inst/alttpr.sh"
	mv "$md_conf_root/$md_id" "$md_conf_root/ports"
}
