import { clientRoutesConfig } from "@/config/clientRoutesConfig";

export const routeNameMap = Object.fromEntries(
  clientRoutesConfig.map(({ path, name }) => [path, name])
);
