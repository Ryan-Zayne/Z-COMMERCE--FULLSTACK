import { useState } from "react";

const useConstant = <TResult>(initCallbackFn: () => TResult) => useState(initCallbackFn)[0];

export { useConstant };
