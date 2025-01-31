#!/usr/bin/env bash

rp_module_id="alttpr-for-my-retro-pie"
rp_module_desc="A client for ALTTPR that makes randomizing ROMS for configured presets a couple of button presses."
rp_module_licence="https://github.com/lsphillips/alttpr-for-my-retro-pie/blob/main/LICENSE.txt"
rp_module_section="exp"

function depends_alttpr-for-my-retro-pie() {
    getDepends xorg matchbox
}

function install_bin_alttpr-for-my-retro-pie() {
    # eval wget $(curl -s https://api.github.com/repos/lsphillips/alttpr-for-my-retro-pie/releases/latest | grep debian_installer | cut -d : -f 2,3)
	aptInstall ./RetroPie-Setup/scriptmodules/ports/alttpr.deb
}

function configure_alttpr-for-my-retro-pie() {
	mkRomDir "ports"
	mkdir -p "$md_inst"
	moveConfigDir "$home/.config/$md_id" "$md_conf_root/ports/$md_id"

	cat > "$md_inst/$md_id.sh" << _EOF_
#!/bin/bash
xset -dpms s off s noblank
matchbox-window-manager -use_titlebar no &
/usr/bin/alttpr-for-my-retro-pie
_EOF_
	chmod +x "$md_inst/$md_id.sh"

	addPort "$md_id" "alttpr" "ALTTPR For My Retro Pie" "XINIT: $md_inst/$md_id.sh"
	mv "$md_conf_root/$md_id" "$md_conf_root/ports"
}
