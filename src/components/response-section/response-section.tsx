import type { ResponseData } from '@/types/http-request';

import { RequestBodyEditor } from '@/components/request-body-editor/request-body-editor';

type Props = {
  response: ResponseData;
  isLoading: boolean;
};

const HTTP_ERROR = 400;

export const ResponseSection = ({ response, isLoading }: Props) => {
  const statusStyle = response.status >= HTTP_ERROR ? 'text-red-500' : 'text-green-500';

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (response.error) {
    return (
      <section className="mb-4 rounded bg-red-100 p-3 text-red-800">
        <strong>Error:</strong> {response.error}
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex gap-4">
        <div>
          <span className="text-sm text-gray-500">Status:</span>
          <span className={`ml-2 font-semibold ${statusStyle}`}>{response.status || ''}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status Text:</span>
          <span className={`ml-2 font-semibold ${statusStyle}`}>{response.statusText}</span>
        </div>
      </div>

      {response.body && <RequestBodyEditor body={response.body} mode="json" readOnly title="Response Body" />}
    </section>
  );
};
