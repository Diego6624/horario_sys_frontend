import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import HoraryComponent from "../pages/HoraryComponent";
import NotFoundComponent from "../pages/NotFoundComponent";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
        <Route index={true} element={<HoraryComponent />} />
    </Route>
));

export default router;