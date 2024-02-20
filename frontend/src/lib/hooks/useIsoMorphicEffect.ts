import { isServer } from "@/lib/utils/constants";
import { useEffect, useLayoutEffect } from "react";

const useIsoMorpicEffect = isServer ? useEffect : useLayoutEffect;

export { useIsoMorpicEffect };
