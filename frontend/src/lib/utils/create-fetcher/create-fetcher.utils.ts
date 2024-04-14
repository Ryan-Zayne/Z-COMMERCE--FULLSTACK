import { isObject } from "@/lib/type-helpers/typeof";
import type { BaseConfig } from "./create-fetcher.types";

export const getResponseData = <TResponse>(response: Response) => {
	const isJson = response.headers.get("content-type")?.includes("application/json");

	return isJson ? (response.json() as Promise<TResponse>) : (response.text() as Promise<TResponse>);
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

export const fetchSpecficKeys = [
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

export const defaultOptions = {
	interceptors: {} as Required<BaseConfig>["interceptors"],
	baseURL: "",
	retries: 0,
	retryCodes: defaultRetryCodes,
	retryMethods: defaultRetryMethods,
	retryDelay: 0,
	defaultErrorMessage: "Failed to fetch data from server!",
	shouldThrowErrors: false,
} satisfies BaseConfig;

export const isHTTPError = (errorName: unknown): errorName is "HTTPError" => errorName === "HTTPError";

type ErrorDetails<TErrorResponse> = {
	response: Response & { data: TErrorResponse };
	defaultErrorMessage: string;
};

export class HTTPError<TErrorResponse = Record<string, unknown>> extends Error {
	response: ErrorDetails<TErrorResponse>["response"];

	override name = "HTTPError";

	isHTTPError = true;

	constructor(errorDetails: ErrorDetails<TErrorResponse>) {
		const { defaultErrorMessage, response } = errorDetails;

		super((response as { message?: string }).message ?? defaultErrorMessage);

		this.response = response;
	}
}

export const isHTTPErrorObject = <TErrorResponse>(error: unknown): error is HTTPError<TErrorResponse> =>
	isObject(error) && error.name === "HTTPError" && error.isHTTPError === true;
