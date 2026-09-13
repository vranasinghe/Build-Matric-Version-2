import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeOne from "./sections/pages/HomeOne";
import About from "./sections/pages/About";
import Service from "./sections/pages/Service";
import ServiceDetails from "./sections/pages/ServiceDetails";
import Project from "./sections/pages/Project";
import ProjectDetails from "./sections/pages/ProjectDetails";
import Contact from "./sections/pages/Contact";
import AdminLayout from "./admin/AdminLayout";
import { ContentProvider } from "./admin/ContentContext";

const router = createBrowserRouter([
	{ path: "/", element: <HomeOne /> },
	{ path: "/home-1", element: <HomeOne /> },
	{ path: "/about", element: <About /> },
	{ path: "/service", element: <Service /> },
	{ path: "/service-details", element: <ServiceDetails /> },
	{ path: "/project", element: <Project /> },
	{ path: "/project-details", element: <ProjectDetails /> },
	{ path: "/contact", element: <Contact /> },
	{ path: "/admin", element: <AdminLayout /> },
]);

function App() {
	return (
		<ContentProvider>
			<RouterProvider router={router} />
		</ContentProvider>
	);
}

export default App;
