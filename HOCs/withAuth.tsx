import { useRouter } from 'next/router'
import { useStores } from 'hooks/useStores'

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = props => {
    const router = useRouter()
    const { authStore } = useStores()

    // useEffect(() => {
    //   if (authStore.getLocalStorageAccessToken()) {
    //     authStore.fetchCurrentUser()
    //   }
    // }, [])

    // useEffect(() => {
    //   if ((!authStore.user || !authStore.user.id) && !authStore.isLoading) {
    //     router.push(routes.auth.login.value)
    //   }
    // }, [authStore.user, authStore.isLoading])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
