import { isObject } from "@/lib/type-helpers/typeof";
import { omitKeys } from "@/lib/utils/omitKeys";
import { pickKeys } from "@/lib/utils/pickKeys";
import type { BaseConfig, ExtraOptions } from "./create-fetcher.types";

export const getUrlWithParams = (url: string, params: Record<string, string> | undefined) => {
	if (!params) {
		return url;
	}

	const paramsString = new URLSearchParams(params).toString();

	if (!url.includes("?")) {
		return `${url}?${paramsString}`;
	}

	if (url.at(-1) === "?") {
		return `${url}${paramsString}`;
	}

	return `${url}&${paramsString}`;
};

export const createResponseLookup = <TResponse>(
	response: Response,
	parser?: Required<BaseConfig>["responseParser"]
) => ({
	json: async () => {
		const data = parser<TResponse | null>?.(await response.text());

		// == use native response.json() as last resort of parser fails or is specified as null or undefined
		return (data ?? response.json()) as Promise<TResponse>;
	},
	arrayBuffer: () => response.arrayBuffer() as Promise<TResponse>,
	blob: () => response.blob() as Promise<TResponse>,
	formData: () => response.formData() as Promise<TResponse>,
	text: () => response.text() as Promise<TResponse>,
});

export const getResponseData = <TResponse>(
	response: Response,
	responseType: keyof ReturnType<typeof createResponseLookup>,
	parser: Required<BaseConfig>["responseParser"]
) => {
	const RESPONSE_LOOKUP = createResponseLookup<TResponse>(response, parser);

	if (!Object.hasOwn(RESPONSE_LOOKUP, responseType)) {
		throw new Error(`Invalid response type: ${responseType}`);
	}

	return RESPONSE_LOOKUP[responseType]();
};

const retryCodesLookup = {
	408: "Request Timeout",
	409: "Conflict",
	425: "Too Early",
	429: "Too Many Requests",
	500: "Internal Server Error",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
};

export const defaultRetryCodes: Required<BaseConfig>["retryCodes"] =
	Object.keys(retryCodesLookup).map(Number);

export const defaultRetryMethods: Required<BaseConfig>["retryMethods"] = ["GET"];

const fetchSpecficKeys = [
	"body",
	"integrity",
	"method",
	"headers",
	"signal",
	"cache",
	"redirect",
	"window",
	"credentials",
	"keepalive",
	"referrer",
	"priority",
	"mode",
	"referrerPolicy",
] satisfies Array<keyof BaseConfig>;

export const pickFetchConfig = <TObject extends Record<string, unknown>>(config: TObject): RequestInit =>
	pickKeys(config, fetchSpecficKeys) as RequestInit;
export const omitFetchConfig = <TObject extends Record<string, unknown>>(config: TObject): ExtraOptions =>
	omitKeys(config, fetchSpecficKeys);

export const isHTTPError = (errorName: unknown): errorName is "HTTPError" => errorName === "HTTPError";

type ErrorDetails<TErrorResponse> = {
	response: Response & { data: TErrorResponse };
	defaultErrorMessage: string;
};

export class HTTPError<TErrorResponse = Record<string, unknown>> extends Error {
	response: ErrorDetails<TErrorResponse>["response"];

	override name = "HTTPError" as const;

	isHTTPError = true;

	constructor(errorDetails: ErrorDetails<TErrorResponse>, errorOptions?: ErrorOptions) {
		const { defaultErrorMessage, response } = errorDetails;

		super((response as { message?: string }).message ?? defaultErrorMessage, errorOptions);

		this.response = response;
	}
}

export const isHTTPErrorInstance = <TErrorResponse>(
	error: unknown
): error is HTTPError<TErrorResponse> => {
	return (
		(isObject(error) && error.name === "HTTPError" && error.isHTTPError === true) ||
		error instanceof HTTPError
	);
};