"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/style.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const encodedPassword = btoa(password);
    console.log("비밀번호:::", encodedPassword);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: encodedPassword }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.log("error가 발생했습니다.");
    }
  };

  // 엔터 키 눌렀을 때 로그인
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const button = document.getElementById("loginButton");
      if (button) {
        button.click();
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        gap: 20,
        borderColor: "transparent",
        paddingTop: 100,
      }}
    >
      <div>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="inputField"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField"
        />
      </div>
      <button className="loginButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
