import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStores } from 'hooks/useStores'

const events = ['mousemove'] // Add more events as needed

export interface IAutoLogout {
  onLogout: () => void
  milliseconds: number
  children: JSX.Element
}
const AutoLogout = ({ onLogout, milliseconds, children }: IAutoLogout) => {
  let timer: NodeJS.Timeout
  const { authStore } = useStores()
  const router = useRouter()

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer()
      Object.values(events)?.forEach(item => {
        window.removeEventListener(item, resetTimer)
      })
      onLogout()
    }, milliseconds)
  }

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer)
  }

  useEffect(() => {
    Object.values(events)?.forEach(item => {
      window.addEventListener(item, () => {
        resetTimer()
        handleLogoutTimer()
      })
    })
  }, [])

  return <div>{children}</div>
}

export default observer(AutoLogout)
