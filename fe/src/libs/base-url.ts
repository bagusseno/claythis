export function baseUrl(path: string)
{
  if(path[0] == '/')
    return process.env.NEXT_PUBLIC_BASE_URL + path
  else
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`
}