import useUser from "../hooks/user/useUser"

export default function RoutGuard() {
	const { user } = useUser()
	const currentRouterPathName = location.pathname
	console.log(currentRouterPathName)
	return (
		<>
			{(() => {
				if (!user && currentRouterPathName !== '/Login/') return <Navigate to="/Login/" />
				if(currentRouterPathName === '/Login/' && user) return <Navigate to="/" />
				return <Outlet />
			})()}
		</>
	)
}