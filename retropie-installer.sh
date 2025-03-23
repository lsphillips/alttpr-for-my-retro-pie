#!/usr/bin/env bash

rp_module_id="alttpr-for-my-retro-pie"
rp_module_desc="A client for ALTTPR that makes randomizing ROMS for configured presets a couple of button presses."
rp_module_help="You can find more documentation or raise an issue here: https://github.com/lsphillips/alttpr-for-my-retro-pie"
rp_module_licence="MIT https://github.com/lsphillips/alttpr-for-my-retro-pie/blob/main/LICENSE.txt"
rp_module_section="exp"

function depends_alttpr-for-my-retro-pie() {
	getDepends jq xorg matchbox
}

function install_bin_alttpr-for-my-retro-pie() {
	wget $(curl -s https://api.github.com/repos/lsphillips/alttpr-for-my-retro-pie/releases/latest | jq -r ".assets[] | select(.name | test(\"arm64.deb\")) | .browser_download_url") --output-document "$md_id.deb"
	aptInstall "./$md_id.deb"
	rm "$md_id.deb"
}

function configure_alttpr-for-my-retro-pie() {
	mkRomDir "ports"
	mkdir -p "$md_inst"
	moveConfigDir "$home/.config/$md_id" "$md_conf_root/ports/$md_id"

	cat > "$md_inst/$md_id.sh" << _EOF_
#!/bin/bash
xset -dpms s off s noblank
matchbox-window-manager -use_titlebar no -use_cursor no &
/usr/bin/alttpr-for-my-retro-pie
_EOF_
	chmod +x "$md_inst/$md_id.sh"

	addPort "$md_id" "$md_id" "ALTTPR For My Retro Pie" "XINIT: $md_inst/$md_id.sh"
}
