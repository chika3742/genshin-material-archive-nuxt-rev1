export const jsonResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const errorResponse = (message: string, code: string, status = 500) => {
  return jsonResponse({message, code}, status)
}
