#!/usr/bin/env bash
set -euo pipefail

# Force mGBA's Qt software display path so X11 screenshots contain the actual
# emulated framebuffer instead of an uncaptured OpenGL surface under Xvfb.
export QT_QPA_PLATFORM=xcb
export QT_OPENGL=software
export QT_XCB_GL_INTEGRATION=none
export LIBGL_ALWAYS_SOFTWARE=1
export SDL_AUDIODRIVER=dummy
export QT_SCALE_FACTOR=1
export XDG_CONFIG_HOME="$PWD/results/xdg_config"

for dir in mgba mGBA mgba-qt; do
  mkdir -p "$XDG_CONFIG_HOME/$dir"
  cat > "$XDG_CONFIG_HOME/$dir/qt.ini" <<'EOF'
[General]
displayDriver=0
filter=false
lockAspectRatio=true
integerScaling=false
EOF
done

exec bash ilyan_pf2_emulator_gate/run_gate.sh
