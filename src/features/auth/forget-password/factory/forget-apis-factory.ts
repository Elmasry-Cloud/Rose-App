export default async function forgetApisFactory<TBody>({
  endpoint,
  body,
}: {
  endpoint: string;
  body: TBody;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${endpoint} failed`);
  }

  //   const data:IApiResponse<Response> = await response.json()
  const data = await response.json();

  return data;
}
