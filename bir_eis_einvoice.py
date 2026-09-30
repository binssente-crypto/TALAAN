"""
bir_eis_einvoice.py — Talaan to BIR EIS reference pipeline runner.
Delegates to tools/talaan_eis_transmit.py.
"""
from __future__ import annotations

import sys
from pathlib import Path

# Add tools directory to sys.path so relative imports in tools resolve properly
sys.path.insert(0, str(Path(__file__).parent / "tools"))

from tools.talaan_eis_transmit import main

if __name__ == "__main__":
    main()
