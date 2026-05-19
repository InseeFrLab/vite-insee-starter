import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import {
    //BatchSpanProcessor,
    ConsoleSpanExporter,
    SimpleSpanProcessor
} from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";

import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
    createSessionManager,
    createSessionSpanProcessor,
    createDefaultSessionIdGenerator,
    createLocalStorageSessionStore
} from "@opentelemetry/web-common";

import {
    ATTR_USER_AGENT_ORIGINAL,
    ATTR_BROWSER_LANGUAGE
} from "@opentelemetry/semantic-conventions/incubating";

const exporter = new OTLPTraceExporter({
    url: import.meta.env.VITE_OTEL_COLLECTOR_URL
});

const sessionManager = createSessionManager({
    sessionIdGenerator: createDefaultSessionIdGenerator(),
    sessionStore: createLocalStorageSessionStore(),
    maxDuration: 7200, // 4 hours
    inactivityTimeout: 1800 // 30 minutes
});

sessionManager.start();

const tracerProvider = new WebTracerProvider({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: "vite-insee-starter",
        [ATTR_SERVICE_VERSION]: "0.1.0",
        // Incubating attributes — not yet standardized
        [ATTR_USER_AGENT_ORIGINAL]: navigator.userAgent,
        [ATTR_BROWSER_LANGUAGE]: navigator.language
    }),
    spanProcessors: [
        createSessionSpanProcessor(sessionManager),
        new SimpleSpanProcessor(new ConsoleSpanExporter()),
        new SimpleSpanProcessor(exporter)
    ]
});

tracerProvider.register({
    contextManager: new ZoneContextManager(), // Context manager compatible with async operations in the browser
    propagator: new W3CTraceContextPropagator() // Standard propagator for trace context (traceparent, tracestate)
});

registerInstrumentations({
    instrumentations: [
        new UserInteractionInstrumentation(),
        new FetchInstrumentation({
            ignoreUrls: [/localhost:(4173|5173)\//],
            propagateTraceHeaderCorsUrls: [/.*/],
            clearTimingResources: true
        }),
        new XMLHttpRequestInstrumentation({ propagateTraceHeaderCorsUrls: [/.*/] }) // XMLHttpRequest instrumentation, in case some libraries use XHR instead of fetch
    ]
});
