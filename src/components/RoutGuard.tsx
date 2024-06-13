import useUser from "../hooks/user/useUser"

export default function RoutGuard() {
	const { user } = useUser()
	const currentRouterPathName = location.pathname
	return (
		<>
			{(() => {
				if(!user) return alert('無法獲取使用者資訊')
				if (!user && currentRouterPathName !== '/Login/') return <Navigate to="/Login/" />
				if(currentRouterPathName === '/Login/' && user) return <Navigate to="/" />
				return <Outlet />
			})()}
		</>
	)
}