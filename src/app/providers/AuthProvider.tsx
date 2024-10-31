import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { apiRoutes } from "@/src/lib/apiRoutes";
import cAxios from "@/src/lib/cAxios";
import { setUser } from "@/src/store/userSlice";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  async function getUser() {
    try {
      dispatch(setUser({ isLoading: true }));
      const res = await cAxios.get(apiRoutes.getUser);
      const data = res.data.data;
      console.log("user: ", data);
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
      console.log("user from user provider: ", user);
    } catch (error) {
      console.error("error getting auth user", error);
      dispatch(setUser({ isLoading: false, isAuth: false }));
    }

    console.log(
      "is auth from memory",
      await SecureStore.getItemAsync("isAuth")
    );
  }
  useEffect(() => {
    getUser();
  }, []);
  return children;
};

export default AuthProvider;
