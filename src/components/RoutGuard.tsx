import useUser from "../hooks/user/useUser"

export default function RoutGuard() {
	const { user } = useUser()
	const currentRouterPathName = location.pathname
	return (
		<>
			{(() => {
				if (user && currentRouterPathName !== '/Login/') return <Outlet />;
				else if (currentRouterPathName === '/Login/') return <Navigate to="/" />
				else return <Navigate to="/Login/" />
			})()}
		</>
	)
}