export async function GET() 
{
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`)
  const menus = await data.json()
  
  return Response.json(menus)
}

export async function POST(request: Request) 
{
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {    
    method: 'POST',
    body: JSON.stringify(await request.json()),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const menu = await data.json()
  
  return Response.json(menu)
}