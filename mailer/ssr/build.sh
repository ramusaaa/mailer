#!/bin/bash
set -e

# Go to script directory
cd "$(dirname "$0")"

# Install Node dependencies for bundle.js
if [ -f src/package.json ]; then
  cd src
  npm install
  cd ..
fi

# Build Rust library
cd src
cargo build --release
cd ..

echo "Build complete. Rust library and Node dependencies are ready." 