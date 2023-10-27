import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuth } from "../middleware/ProtectedRoutes";

const useSession = () => {

    const session = isAuth()
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate()

    useEffect(() => {

        if (!session) {

            navigate('/', { replace: true })
        }

    }, [navigate, session]);


    return decodedSession;
}
export default useSession;