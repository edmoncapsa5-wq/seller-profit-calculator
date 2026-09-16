#!/usr/bin/env bash
set -euo pipefail
mkdir -p screenshots results

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
if [[ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]]; then
  echo "ROM SHA mismatch: expected $EXPECTED_SHA, got $ACTUAL_SHA" >&2
  exit 10
fi

export DISPLAY=:99
Xvfb :99 -screen 0 1280x960x24 > results/xvfb.log 2>&1 &
XVFB_PID=$!
sleep 0.6
openbox > results/openbox.log 2>&1 &
OPENBOX_PID=$!
trap 'kill ${MGBA_PID:-0} ${OPENBOX_PID:-0} ${XVFB_PID:-0} 2>/dev/null || true' EXIT
sleep 0.7

EMU="${MGBA_BIN:-}"
if [[ -z "$EMU" ]]; then
  EMU="$(command -v mgba-qt || command -v mgba || true)"
fi
if [[ -z "$EMU" || ! -x "$EMU" ]]; then
  echo 'mGBA executable missing' >&2
  exit 2
fi
"$EMU" --version > results/mgba_version.txt 2>&1 || true
cat results/mgba_version.txt

"$EMU" -2 -l 127 results/pf2.gba > results/mgba.log 2>&1 &
MGBA_PID=$!

# Select the real top-level emulator window. Qt creates tiny helper windows too,
# so taking the first/last XID is unsafe. Require a credible gameplay-sized window
# and choose the largest visible candidate.
WIN=''
BEST_AREA=0
: > results/window_candidates.txt
for i in $(seq 1 150); do
  BEST=''
  BEST_AREA=0
  {
    xdotool search --pid "$MGBA_PID" 2>/dev/null || true
    xdotool search --name 'mGBA' 2>/dev/null || true
  } | sort -u > results/window_candidates_current.txt

  while IFS= read -r cand; do
    [[ -z "$cand" ]] && continue
    geo="$(xdotool getwindowgeometry --shell "$cand" 2>/dev/null || true)"
    w="$(printf '%s\n' "$geo" | awk -F= '/^WIDTH=/{print $2}')"
    h="$(printf '%s\n' "$geo" | awk -F= '/^HEIGHT=/{print $2}')"
    x="$(printf '%s\n' "$geo" | awk -F= '/^X=/{print $2}')"
    y="$(printf '%s\n' "$geo" | awk -F= '/^Y=/{print $2}')"
    printf '%s width=%s height=%s x=%s y=%s\n' "$cand" "${w:-?}" "${h:-?}" "${x:-?}" "${y:-?}" >> results/window_candidates.txt
    if [[ "${w:-}" =~ ^[0-9]+$ && "${h:-}" =~ ^[0-9]+$ ]]; then
      area=$((w*h))
      if (( w >= 200 && h >= 150 && area > BEST_AREA )); then
        BEST="$cand"
        BEST_AREA="$area"
      fi
    fi
  done < results/window_candidates_current.txt

  if [[ -n "$BEST" ]]; then
    WIN="$BEST"
    break
  fi
  sleep 0.1
done

if [[ -z "$WIN" ]]; then
  echo 'No credible mGBA gameplay window found' >&2
  cat results/window_candidates.txt >&2 || true
  cat results/mgba.log >&2 || true
  exit 3
fi

echo "$WIN" > results/window_id.txt
xdotool getwindowgeometry --shell "$WIN" | tee results/window_geometry.txt
xdotool windowmap "$WIN" 2>/dev/null || true
xdotool windowactivate --sync "$WIN" 2>/dev/null || true
sleep 0.8

# Require sane dimensions before any screenshot/input test.
WIN_GEO="$(xdotool getwindowgeometry --shell "$WIN")"
WIN_W="$(printf '%s\n' "$WIN_GEO" | awk -F= '/^WIDTH=/{print $2}')"
WIN_H="$(printf '%s\n' "$WIN_GEO" | awk -F= '/^HEIGHT=/{print $2}')"
if ! [[ "$WIN_W" =~ ^[0-9]+$ && "$WIN_H" =~ ^[0-9]+$ ]] || (( WIN_W < 200 || WIN_H < 150 )); then
  echo "Invalid emulator window geometry: ${WIN_W}x${WIN_H}" >&2
  exit 4
fi

shot() {
  local name="$1"
  local geo x y w h
  geo="$(xdotool getwindowgeometry --shell "$WIN")"
  x="$(printf '%s\n' "$geo" | awk -F= '/^X=/{print $2}')"
  y="$(printf '%s\n' "$geo" | awk -F= '/^Y=/{print $2}')"
  w="$(printf '%s\n' "$geo" | awk -F= '/^WIDTH=/{print $2}')"
  h="$(printf '%s\n' "$geo" | awk -F= '/^HEIGHT=/{print $2}')"
  sleep 0.035
  scrot -a "${x},${y},${w},${h}" "screenshots/${name}.png"
}
key_down(){ xdotool keydown --window "$WIN" "$1"; }
key_up(){ xdotool keyup --window "$WIN" "$1"; }
key_tap(){ xdotool key --window "$WIN" "$1"; }

shot 00_boot
kill -0 "$MGBA_PID"

key_down Right
sleep 0.10; shot 01_accel
sleep 0.35; shot 02_cruise
key_up Right
sleep 0.10; shot 03_stop
key_down Left
sleep 0.12; shot 04_reverse
sleep 0.20; key_up Left
shot 05_reverse_release

key_tap BackSpace
sleep 0.25

key_down Right
sleep 0.12
key_tap z
sleep 0.05; shot 06_quick_early
sleep 0.09; shot 07_quick_late
key_up Right

key_tap BackSpace
sleep 0.20
key_down Right
sleep 0.62
key_up Right
shot 08_attack_range

key_tap x
sleep 0.07; shot 09_attack1
sleep 0.09; key_tap x
sleep 0.07; shot 10_attack2
sleep 0.10; key_tap x
sleep 0.07; shot 11_attack3
sleep 0.22; shot 12_combo_recovery

key_tap BackSpace
sleep 0.20
key_down Right
sleep 0.62
key_up Right
key_down s
sleep 0.25; shot 13_guard
key_up s
for n in $(seq 1 18); do
  key_tap s
  sleep 0.050
  shot "14_parry_scan_${n}"
done

key_tap x
sleep 0.08; shot 15_redirect_attempt

key_tap BackSpace
sleep 0.20
key_down Right
sleep 0.60
key_up Right
key_down a
key_tap x
key_up a
sleep 0.09; shot 16_dalum

key_tap Return
sleep 0.05
key_tap x
sleep 0.08; shot 17_debug_contact

sleep 5
kill -0 "$MGBA_PID"
shot 18_soak

python3 - <<'PY'
from PIL import Image, ImageChops, ImageStat
from pathlib import Path
import json, statistics, hashlib
files=sorted(Path('screenshots').glob('*.png'))
rows=[]
thumbs={}
for p in files:
    im=Image.open(p).convert('RGB')
    thumb=im.resize((120,80),Image.Resampling.BILINEAR)
    thumbs[p.name]=thumb
    colors=im.getcolors(maxcolors=10_000_000) or []
    pix=list(thumb.getdata())
    lum=[(r*299+g*587+b*114)/1000 for r,g,b in pix]
    rows.append({'file':p.name,'size':list(im.size),'unique_colors':len(colors),'luma_mean':round(statistics.fmean(lum),2),'luma_stdev':round(statistics.pstdev(lum),2),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
assert len(rows)>=24, f'only {len(rows)} screenshots'
assert all(r['size'][0] >= 200 and r['size'][1] >= 150 for r in rows), rows
assert all(r['unique_colors']>40 for r in rows), rows
assert all(r['luma_stdev']>5 for r in rows), rows
boot=thumbs['00_boot.png']
def mad(a,b):
    diff=ImageChops.difference(a,b)
    st=ImageStat.Stat(diff)
    return sum(st.mean)/3
change={name:round(mad(boot,thumbs[name]),3) for name in ['02_cruise.png','04_reverse.png','06_quick_early.png','09_attack1.png','11_attack3.png','13_guard.png','16_dalum.png','17_debug_contact.png']}
assert max(change.values())>0.8, change
assert len(set(r['sha256'] for r in rows))>=10, 'too few distinct rendered frames'
Path('results/screenshot_stats.json').write_text(json.dumps(rows,indent=2))
Path('results/render_change.json').write_text(json.dumps(change,indent=2))
print(json.dumps(change,indent=2))
PY

if grep -Eiq 'fatal|segmentation|assertion failed|crash|illegal instruction|unhandled exception' results/mgba.log; then
  echo 'Potential emulator/runtime fatal signature:' >&2
  cat results/mgba.log >&2
  exit 5
fi

echo 'EMULATOR_RUNTIME_GATE_PASS' | tee results/status.txt
