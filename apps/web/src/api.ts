const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const apiGet = async <T>(path: string) => {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const apiPost = async <T>(path: string, body: unknown) => {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export { API };
