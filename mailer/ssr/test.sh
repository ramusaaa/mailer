#!/bin/bash
set -e

cd "$(dirname "$0")"

# Set library path for Rust shared library
echo "Setting library path..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  export DYLD_LIBRARY_PATH="$(pwd)/target/release:$DYLD_LIBRARY_PATH"
else
  export DYLD_LIBRARY_PATH="$(pwd)/target/release:$DYLD_LIBRARY_PATH"
fi

# Run Go SSR example with absolute path
echo "Running Go SSR test..."
go run ../cmd/demo/main.go

echo "Test complete."