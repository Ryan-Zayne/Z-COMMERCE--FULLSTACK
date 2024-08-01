import * as For from "./For";

function getElementList(type: "base"): [typeof For.Base];
function getElementList(type?: "withWrapper"): [typeof For.List];

function getElementList(type = "withWrapper") {
	return type === "withWrapper" ? [For.List] : [For.Base];
}

export { getElementList };
