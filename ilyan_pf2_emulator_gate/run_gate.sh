#!/usr/bin/env bash
set -euo pipefail
mkdir -p screenshots_native screenshots_window results

cat \
  ilyan_pf2_emulator_gate/rom.b64.part00 \
  pf2_chunks_fix/part01_0 pf2_chunks_fix/part01_1 pf2_chunks_fix/part01_2 pf2_chunks_fix/part01_3 \
  ilyan_pf2_emulator_gate/rom.b64.part02 \
  ilyan_pf2_emulator_gate/rom.b64.part03 \
  ilyan_pf2_emulator_gate/rom.b64.part04 \
  ilyan_pf2_emulator_gate/rom.b64.part05 \
  ilyan_pf2_emulator_gate/rom.b64.part06 \
  ilyan_pf2_emulator_gate/rom.b64.part07 \
  | base64 -d > results/pf2.gba.xz
xz -dc results/pf2.gba.xz > results/pf2.gba
EXPECTED_SHA='5231a2c77b679dc4e61cb2b4c5284adafa8a1313ce8b4bd50709d149cd3bbfb2'
ACTUAL_SHA="$(sha256sum results/pf2.gba | awk '{print $1}')"
echo "$ACTUAL_SHA  results/pf2.gba" | tee results/rom_sha256.txt
[[ "$ACTUAL_SHA" == "$EXPECTED_SHA" ]] || { echo "ROM SHA mismatch" >&2; exit 10; }

export DISPLAY=:99
export LIBGL_ALWAYS_SOFTWARE=1
export QT_OPENGL=software
export QT_XCB_GL_INTEGRATION=none
Xvfb :99 -screen 0 1280x960x24 > results/xvfb.log 2>&1 &
XVFB_PID=$!
sleep 0.6
openbox > results/openbox.log 2>&1 &
OPENBOX_PID=$!
trap 'kill ${MGBA_PID:-0} ${OPENBOX_PID:-0} ${XVFB_PID:-0} 2>/dev/null || true' EXIT
sleep 0.7

EMU="${MGBA_BIN:-}"
[[ -n "$EMU" && -x "$EMU" ]] || EMU="$(command -v mgba-qt || command -v mgba || true)"
[[ -n "$EMU" && -x "$EMU" ]] || { echo 'mGBA executable missing' >&2; exit 2; }
"$EMU" --version > results/mgba_version.txt 2>&1 || true
cat results/mgba_version.txt

"$EMU" -2 -l 127 results/pf2.gba > results/mgba.log 2>&1 &
MGBA_PID=$!

WIN=''
BEST_AREA=0
: > results/window_candidates.txt
for i in $(seq 1 150); do
  BEST=''; BEST_AREA=0
  { xdotool search --pid "$MGBA_PID" 2>/dev/null || true; xdotool search --name 'mGBA' 2>/dev/null || true; } | sort -u > results/window_candidates_current.txt
  while IFS= read -r cand; do
    [[ -n "$cand" ]] || continue
    geo="$(xdotool getwindowgeometry --shell "$cand" 2>/dev/null || true)"
    w="$(printf '%s\n' "$geo" | awk -F= '/^WIDTH=/{print $2}')"; h="$(printf '%s\n' "$geo" | awk -F= '/^HEIGHT=/{print $2}')"
    x="$(printf '%s\n' "$geo" | awk -F= '/^X=/{print $2}')"; y="$(printf '%s\n' "$geo" | awk -F= '/^Y=/{print $2}')"
    printf '%s width=%s height=%s x=%s y=%s\n' "$cand" "${w:-?}" "${h:-?}" "${x:-?}" "${y:-?}" >> results/window_candidates.txt
    if [[ "${w:-}" =~ ^[0-9]+$ && "${h:-}" =~ ^[0-9]+$ ]]; then
      area=$((w*h)); if (( w >= 200 && h >= 150 && area > BEST_AREA )); then BEST="$cand"; BEST_AREA="$area"; fi
    fi
  done < results/window_candidates_current.txt
  [[ -n "$BEST" ]] && { WIN="$BEST"; break; }
  sleep 0.1
done
[[ -n "$WIN" ]] || { echo 'No credible mGBA gameplay window found' >&2; exit 3; }

echo "$WIN" > results/window_id.txt
xdotool getwindowgeometry --shell "$WIN" | tee results/window_geometry.txt
xdotool windowmap "$WIN" 2>/dev/null || true
xdotool windowactivate --sync "$WIN" 2>/dev/null || true
sleep 1.0

key_down(){ xdotool keydown --window "$WIN" "$1"; }
key_up(){ xdotool keyup --window "$WIN" "$1"; }
key_tap(){ xdotool key --window "$WIN" "$1"; }

native_shot() {
  local name="$1"
  local marker="results/.shot_marker_${name}"
  local newest=''
  touch "$marker"
  key_tap F12
  for _ in $(seq 1 40); do
    newest="$(find results -maxdepth 1 -type f -name '*.png' -newer "$marker" -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -n1 | cut -d' ' -f2- || true)"
    [[ -n "$newest" ]] && break
    sleep 0.05
  done
  rm -f "$marker"
  [[ -n "$newest" && -s "$newest" ]] || { echo "mGBA native screenshot missing for $name" >&2; exit 21; }
  cp "$newest" "screenshots_native/${name}.png"
}

window_shot() {
  local name="$1" geo x y w h
  geo="$(xdotool getwindowgeometry --shell "$WIN")"
  x="$(printf '%s\n' "$geo" | awk -F= '/^X=/{print $2}')"; y="$(printf '%s\n' "$geo" | awk -F= '/^Y=/{print $2}')"
  w="$(printf '%s\n' "$geo" | awk -F= '/^WIDTH=/{print $2}')"; h="$(printf '%s\n' "$geo" | awk -F= '/^HEIGHT=/{print $2}')"
  scrot -a "${x},${y},${w},${h}" "screenshots_window/${name}.png" || true
}

native_shot 00_boot
window_shot 00_boot_x11
kill -0 "$MGBA_PID"

key_down Right; sleep 0.10; native_shot 01_accel; sleep 0.35; native_shot 02_cruise; key_up Right
sleep 0.10; native_shot 03_stop
key_down Left; sleep 0.12; native_shot 04_reverse; sleep 0.20; key_up Left; native_shot 05_reverse_release

key_tap BackSpace; sleep 0.25; native_shot 06_reset

key_down Right; sleep 0.12; key_tap z; sleep 0.05; native_shot 07_quick_early; sleep 0.09; native_shot 08_quick_late; key_up Right

key_tap BackSpace; sleep 0.20; key_down Right; sleep 0.62; key_up Right; native_shot 09_attack_range
key_tap x; sleep 0.07; native_shot 10_attack1
sleep 0.09; key_tap x; sleep 0.07; native_shot 11_attack2
sleep 0.10; key_tap x; sleep 0.07; native_shot 12_attack3
sleep 0.22; native_shot 13_combo_recovery

key_tap BackSpace; sleep 0.20; key_down Right; sleep 0.62; key_up Right
key_down s; sleep 0.25; native_shot 14_guard; key_up s
for n in $(seq -w 1 12); do key_tap s; sleep 0.055; native_shot "15_parry_scan_${n}"; done
key_tap x; sleep 0.08; native_shot 16_redirect_attempt

key_tap BackSpace; sleep 0.20; key_down Right; sleep 0.60; key_up Right
key_down a; key_tap x; key_up a; sleep 0.09; native_shot 17_dalum
key_tap Return; sleep 0.05; key_tap x; sleep 0.08; native_shot 18_debug_contact

sleep 5; kill -0 "$MGBA_PID"; native_shot 19_soak
window_shot 19_soak_x11

python3 - <<'PY'
from PIL import Image, ImageChops, ImageStat
from pathlib import Path
import json, statistics, hashlib
files=sorted(Path('screenshots_native').glob('*.png'))
assert len(files) >= 30, f'only {len(files)} native screenshots'
rows=[]; thumbs={}
for p in files:
    im=Image.open(p).convert('RGB')
    thumb=im.resize((120,80),Image.Resampling.NEAREST)
    thumbs[p.name]=thumb
    colors=im.getcolors(maxcolors=10_000_000) or []
    pix=list(thumb.getdata()); lum=[(r*299+g*587+b*114)/1000 for r,g,b in pix]
    rows.append({'file':p.name,'size':list(im.size),'unique_colors':len(colors),'luma_mean':round(statistics.fmean(lum),2),'luma_stdev':round(statistics.pstdev(lum),2),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
assert all(r['size']==[240,160] for r in rows), rows
assert all(r['unique_colors']>40 for r in rows), rows
assert all(r['luma_stdev']>5 for r in rows), rows
assert len(set(r['sha256'] for r in rows)) >= 12, 'too few distinct emulated frames'
boot=thumbs['00_boot.png']
def mad(a,b): return sum(ImageStat.Stat(ImageChops.difference(a,b)).mean)/3
probe=['02_cruise.png','04_reverse.png','07_quick_early.png','10_attack1.png','12_attack3.png','14_guard.png','17_dalum.png','18_debug_contact.png','19_soak.png']
change={n:round(mad(boot,thumbs[n]),3) for n in probe}
assert max(change.values())>1.5, change
Path('results/native_screenshot_stats.json').write_text(json.dumps(rows,indent=2))
Path('results/native_render_change.json').write_text(json.dumps(change,indent=2))
print(json.dumps(change,indent=2))
PY

if grep -Eiq 'fatal|segmentation|assertion failed|crash|illegal instruction|unhandled exception' results/mgba.log; then
  echo 'Potential emulator/runtime fatal signature:' >&2; cat results/mgba.log >&2; exit 5
fi

{
  echo 'EMULATOR_RUNTIME_GATE_PASS'
  echo "ROM_SHA256=$EXPECTED_SHA"
  echo 'EMULATOR=mGBA 0.10.5 official x64 AppImage'
  echo 'FRAMEBUFFER_CAPTURE=mGBA built-in F12 native screenshot'
  echo 'NOTE=This certifies boot/render/input-path/liveness, not subjective controller feel.'
} | tee results/status.txt
