import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import GDSCLogo from "../public/logos/gdsc.png";
import IEDCLogo from "../public/logos/iedc.png";
import IEEELogo from "../public/logos/ieee.png";
import MULNLogo from "../public/logos/mulearn.png";
import FOSSLogo from "../public/logos/foss.png";
import NSSLogo from "../public/logos/nss.png";
import RENVNZA from "../public/logos/renvnza.png";
import MELUHANS from "../public/logos/meluhans.webp";
import RAS from "../public/logos/ras.webp";
import ARC from "../public/logos/arc.webp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function resolveClubIcon(clb: string): any {
  return {
    "GDSC - UCEK": GDSCLogo,
    "IEEE SB UCEK" : IEEELogo,
    "Legacy IEDC - UCEK" : IEDCLogo,
    "μlearn - UCEK" : MULNLogo,
    "FOSS - UCEK": FOSSLogo,
    "NSS - UCEK": NSSLogo,
    "Renvnza '24" : RENVNZA,
    "Meluhans Dance Club" : MELUHANS,
    "IEEE RAS SBC UCEK, IEEE SB UCEK" : RAS,
    "Arc" : ARC

  }[clb];
}