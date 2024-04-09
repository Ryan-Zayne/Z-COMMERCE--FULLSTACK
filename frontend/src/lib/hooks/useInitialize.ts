import { useState } from "react";

const useInitialize = <TResult>(initCallbackFn: () => TResult) => useState(initCallbackFn)[0];

export { useInitialize };
