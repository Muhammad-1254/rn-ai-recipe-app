import { useAppDispatch,  } from "@/src/hooks/redux";
import { apiRoutes } from "@/src/lib/apiRoutes";
import cAxios from "@/src/lib/cAxios";
import { setUser } from "@/src/store/userSlice";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(dispatch);
  }, []);
  return children;
};

export default AuthProvider;

async function getUser(dispatch: any) {
  try {
    
    dispatch(setUser({ isLoading: true }));
    const res = await cAxios.get(apiRoutes.getUser);
    const data = res.data.data;
    if (data._id) {
      dispatch(
        setUser({
          userId: data._id,
          username: data.username,
          email: data.email,
          isLoading: false,
          isAuth: true,
        })
      );
    } else {
      dispatch(setUser({ isLoading: false, isAuth: false }));
    }
  } catch (error) {
    console.error("error getting auth user", error);
    dispatch(setUser({ isLoading: false, isAuth: false }));
  }
}