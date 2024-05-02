import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/Firebase";
import { useDispatch } from "react-redux";

const LoginAndSignup = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    login ? handleLogin(e) : handleSignup(e);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if ([email, password].some((field) => field.trim() === "")) {
      alert("All Fields are required");
      return null;
    }
    try {
      const usercredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = usercredentials.user;
      sessionStorage.setItem("token", user.accessToken);
      sessionStorage.setItem("user", user.email);
      if (user.email==="anju@gmail.com") {
         sessionStorage.setItem("admin",user.email)
         navigate("/")
      } else{
        navigate("/");
      }
     
    
    console.log("logged in successfully");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("invalid email or password");
      }
      console.log(error.message);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if ([email, password, cpass].some((field) => field.trim() === "")) {
      alert("All Fields are required");
      return null;
    }
    if (password !== cpass) {
      alert("password and confirm password must be same");
      return null;
      
    }
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          let user = response.user;
          sessionStorage.setItem("token", user.accessToken);
          sessionStorage.setItem("user", user.email);
        console.log("user created");
          navigate("/");
        })
        .catch((err) => {
          alert("email already exists,please ry different email or use login");
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }

    
    
  };
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      console.log("if executed");
      navigate('/')
    }
  },[])
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-anju">
      <div className="w-[463px] h-[488px] bg-white rounded flex flex-row items-center pl-7 pr-7">
        <div className="px-10 flex flex-col w-full h-full justify-center items-start">
          <div className="loginsignup text-anju text-3xl font-semibold font-lexend mb-3">
            {!login ? "Sign Up" : "Login"}
          </div>
          <div className="h-[1px] w-full bg-anju"></div>
          <div className="flex flex-col items-start justify-center pt-[6px]">
           
            <div className="text-sm text-gray-500 pt-[5px]">E-mail:</div>
            <div className="w-[334px] h-[35px] border border-anju mt-[2px]">
              <input
                type="text"
                className="w-full h-full bg-transparent outline-none px-3"
                placeholder="Enter Your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500  mt-[8px]">password:</div>
            <div className="w-[334px] h-[35px] border border-anju mt-[8px]">
              <input
                type="password"
                className="w-full h-full bg-transparent outline-none px-3"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {login ? (
              <div className=" w-[334px] text-end text-sm text-gray-500 flex justify-end mb-">
                Password <div className="text-anju">?</div>
              </div>
            ) : null}
            {!login ? (
              <>
                <div className="text-sm text-gray-500  mt-[1px]">
                  Confirm password:
                </div>
                <div className="w-[334px] h-[35px] border border-anju mt-[8px]">
                  <input
                    type="password"
                    className="w-full h-full bg-transparent outline-none px-3"
                    placeholder="Confirm Your Password"
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div className="w-[334px] h-[35px] text-white text-center bg-anju font-bold font-lexend text-xl mt-4 mb-2">
            <button className="w-full h-full" onClick={handleSubmit}>
              {!login ? "Sign Up" : "Login"}
            </button>
          </div>
          <div className="flex text-sm">
            Dont Have An Account?
            <div
              className="text-anju font-semibold cursor-pointer"
              onClick={() => setLogin(!login)}
            >
              {login ? "Sign Up" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignup;
