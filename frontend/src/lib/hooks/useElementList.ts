import { ForObject } from "@/components/primitives";

const { For, ForList } = ForObject;

export const useElementList = (): [ForList: typeof ForList] => [ForList];

export const useBaseElementList = (): [For: typeof For] => [For];
