import { setupWorker } from "msw/browser";
import { handlers } from "./hanlders";

export const worker = setupWorker(...handlers);
