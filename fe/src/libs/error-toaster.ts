import toast from 'react-hot-toast'

 export const toastError = (message: string, error: any) => // eslint-disable-line
{
  let toastMessage = message

  if('message' in error)
    toastMessage += ' ' + error.message.split(': {')[0]

  toast.error(toastMessage)
}