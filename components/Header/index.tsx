import { useAuth } from 'hooks/useAuth'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
const Header = () => {
  const { testStore, authStore } = useStores()
  const { loginHandler } = useAuth()

  useEffect(() => {
    loginHandler()
  }, [])

  console.log('testStore?.status', testStore?.status)
  console.log('authStore?.user', authStore?.user)
  return <div>This is header</div>
}

export default observer(Header)
