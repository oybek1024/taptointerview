import {RouterProvider} from "react-router";
import {routes} from "@/router";
import {AntProvider} from "@/providers";

function App() {

    return (
        <AntProvider>
            <RouterProvider router={routes}/>
        </AntProvider>

    )
}

export default App
