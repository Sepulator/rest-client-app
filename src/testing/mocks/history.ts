export const mockHistoryData = [
  {
    id: '1',
    duration: 200,
    status: 500,
    timestamp: '2025-09-21 17:59:06.064+00',
    method: 'POST',
    requestSize: 300,
    responseSize: 300,
    error:
      'Invalid header value: Headers must contain only ASCII characters. Remove non-ASCII characters from header names and values.',
    url: 'https://api.example.com/resource',
    headers: `{"Accept":"*/*"}`,
  },
  {
    id: '2',
    duration: 200,
    status: 200,
    timestamp: '2025-09-21 18:09:20.336+00',
    method: 'POST',
    requestSize: 300,
    responseSize: 300,
    url: 'https://api.example.com/resource/2',
    headers: `{"Accept":"*/*"}`,
  },
];
