import logo from '@/assets/logo.svg'
import { baseUrl } from '@/libs/base-url'
import Link from 'next/link'

type props = {
  url?: string
}

export default function Logo({url = baseUrl('')}: props)
{
    return (
      <Link href={url}>
        <img src={logo.src} alt='creativefaith logo' className='h-full' />  
      </Link>
    )
}