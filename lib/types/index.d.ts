/**
 * @dsh-external/dsh-omniroute-models — host half.
 *
 * Exposes two same-origin JSON routes over the DSH web server:
 *   GET  /omniroute-models/api/catalog?provider=<route>
 *   POST /omniroute-models/api/apply
 *
 * The catalog route interrogates an OpenAI-compatible endpoint (OmniRoute by
 * default) and returns every model it advertises, mapped to the fields the
 * pi-ai provider profile understands (id/name/input/contextWindow/maxTokens),
 * plus an `enabled` flag for the ones DSH currently serves (present in
 * `llm-pi-ai.providers.<route>.models`).
 *
 * The apply route writes the caller's selected model list into that same
 * settings namespace through the public settings seam (`settings.mutate`),
 * so the change takes effect on the next request without a restart.
 *
 * This plugin does NOT register or own the `llm-pi-ai` namespace (that is the
 * pi-ai adapter's); it only reads/writes an already-registered section.
 */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import type { WebServer } from '@deepseek-ai/dsh-host-webserver';
export declare const name = "@dsh-external/dsh-omniroute-models";
export declare const inject: string[];
export interface Config {
    /** Default provider route to manage (overridden by ?provider=). */
    provider?: string;
    /** Default OmniRoute base URL when the provider profile has none. */
    baseURL?: string;
    /** Environment-variable name holding the API key. */
    apiKeyEnv?: string;
}
export declare const Config: z<Schemastery.ObjectS<{
    provider: z<string, string>;
    baseURL: z<string, string>;
    apiKeyEnv: z<string, string>;
}>, Schemastery.ObjectT<{
    provider: z<string, string>;
    baseURL: z<string, string>;
    apiKeyEnv: z<string, string>;
}>>;
type AppContext = Context & {
    webServer: WebServer;
};
/** User-editable web search config (the plugin's own settings namespace). */
export interface SearchSection {
    searchEnabled: boolean;
    searchProvider: string;
    searchBaseURL: string;
    searchApiKeyEnv: string;
    searchApiKey: string;
    searchMaxResults: number;
}
/** Schema for the plugin-owned `omniroute-models` settings section (search). */
export declare const searchSectionSchema: z<Schemastery.ObjectS<{
    searchEnabled: z<boolean, boolean>;
    searchProvider: z<string, string>;
    searchBaseURL: z<string, string>;
    searchApiKeyEnv: z<string, string>;
    searchApiKey: z<string, string>;
    searchMaxResults: z<number, number>;
}>, Schemastery.ObjectT<{
    searchEnabled: z<boolean, boolean>;
    searchProvider: z<string, string>;
    searchBaseURL: z<string, string>;
    searchApiKeyEnv: z<string, string>;
    searchApiKey: z<string, string>;
    searchMaxResults: z<number, number>;
}>>;
export declare function apply(ctx: AppContext, config: Config): void;
export {};
