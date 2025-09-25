import { useRestClientStore } from './store';

export const useMethod = () => useRestClientStore((state) => state.method);

export const useUrl = () => useRestClientStore((state) => state.url);

export const useHeaders = () => useRestClientStore((state) => state.headers);

export const useResponse = () => useRestClientStore((state) => state.response);

export const useIsJsonMode = () => useRestClientStore((state) => state.isJsonMode);

export const useJsonBody = () => useRestClientStore((state) => state.jsonBody);

export const useTextBody = () => useRestClientStore((state) => state.textBody);

export const useCurrentBody = () => useRestClientStore((state) => (state.isJsonMode ? state.jsonBody : state.textBody));

export const useIsLoading = () => useRestClientStore((state) => state.isLoading);

export const useSetMethod = () => useRestClientStore((state) => state.setMethod);

export const useSetUrl = () => useRestClientStore((state) => state.setUrl);

export const useSetHeaders = () => useRestClientStore((state) => state.setHeaders);

export const useAddHeader = () => useRestClientStore((state) => state.addHeader);

export const useUpdateHeader = () => useRestClientStore((state) => state.updateHeader);

export const useRemoveHeader = () => useRestClientStore((state) => state.removeHeader);

export const useSetResponse = () => useRestClientStore((state) => state.setResponse);

export const useSetIsJsonMode = () => useRestClientStore((state) => state.setIsJsonMode);

export const useSetJsonBody = () => useRestClientStore((state) => state.setJsonBody);

export const useSetTextBody = () => useRestClientStore((state) => state.setTextBody);

export const useExecuteRequest = () => useRestClientStore((state) => state.executeRequest);

export const useInitializeFromParams = () => useRestClientStore((state) => state.initializeFromParams);
