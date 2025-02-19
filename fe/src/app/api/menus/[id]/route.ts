export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`)
  const menu = await data.json()
  
  return Response.json(menu)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(await request.json()),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const menu = await data.json()
  
  return Response.json(menu)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`, {
    method: 'DELETE', 
  })
  
  return Response.json({id, status: 'success'})
}