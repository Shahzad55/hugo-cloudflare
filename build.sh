#!/usr/bin/env bash

set -euo pipefail

hugo mod get
hugo build --gc --minify
