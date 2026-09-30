"""
bir_eis_einvoice.py — Talaan to BIR EIS reference pipeline bridge.
Delegates to talaan_eis_transmit.py (Version 2, updated for EOPT / RMC 77-2024 / RMC 98-2026).
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from talaan_eis_transmit import (
    main,
)

if __name__ == "__main__":
    main()
