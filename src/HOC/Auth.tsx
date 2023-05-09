import React, { useEffect } from "react";
import { userAtom } from "../atom/userData";
import { useAtom } from "jotai";
import { RouteURL } from "../App";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../utils/getUserInfo";

type AuthProps = {
  SpecificComponent: React.ComponentType<any>;
  requiredLogin: boolean | null;
};
/**
 *
 * @param SpecificComponent HOC가 필요한 컴포넌트
 * @param requiredLogin null=로그인 상관X, true=개인정보 입력까지 마친 상태만 접근 가능, false=개인정보입력까지 마친 상태면 접근 불가
 * @constructor
 */
const Auth = ({ SpecificComponent, requiredLogin = null }: AuthProps) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(userAtom);
  useEffect(() => {
    console.log("auth 실행중");
    let newUserInfo = userInfo;

    const checkIsLogin = async () => {
      if (!userInfo.userId) {
        newUserInfo = await getUserInfo();
        console.log("newUserInfo");
        console.log(newUserInfo);
        setUserInfo(newUserInfo);
      }

      if (newUserInfo.userType === "onceUser")
        navigate(RouteURL.collect_information);
      else if (newUserInfo.userType === "onceUserWithoutTerms")
        navigate(RouteURL.register_term);
      else if (requiredLogin === false) {
        if (newUserInfo.userType === "activatedUser") navigate(RouteURL.home);
      } else if (requiredLogin === true) {
        if (newUserInfo.userType !== "activatedUser") {
          console.log("여기에 걸림");
          console.log(newUserInfo);

          navigate(RouteURL.login);
        }
      }
    };

    checkIsLogin();
  }, []);

  return <SpecificComponent />;
};

export default Auth;
