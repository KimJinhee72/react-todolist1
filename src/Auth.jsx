import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import {
  auth,
  provider,
  logout as firebaseLogout,
  signInWithEmail,
  signUpWithEmail,
} from "./firebase";
import { useEffect, useState } from "react";

const Auth = ({ setUser }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 구글 로그인
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("구글 로그인 오류:", err);
      alert("구글 로그인에 실패했습니다.");
    }
  };

  // 이메일 로그인
  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmail(email, password);
      setUser(result.user);
    } catch (err) {
      console.error("이메일 로그인 오류:", err);
      alert("이메일 로그인에 실패했습니다. 이메일/비밀번호를 확인하세요.");
    }
  };

  // 이메일 회원가입
  const signupWithEmail = async () => {
    try {
      const result = await signUpWithEmail(email, password);
      setUser(result.user);
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    await firebaseLogout();
    setUser(null);
    setEmail("");
    setPassword("");
  };

  // 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="mb-4 border-t pt-4 mt-4">
      {auth.currentUser ? (
        <div className="flex items-center gap-2">
          <span>{auth.currentUser.displayName || auth.currentUser.email}님</span>
          <button
            onClick={handleLogout}
            className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 w-full"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={loginWithEmail}
              className="bg-blue-500 text-white px-3 py-1 rounded w-full"
            >
              이메일 로그인
            </button>
            <button
              onClick={signupWithEmail}
              className="bg-green-500 text-white px-3 py-1 rounded w-full"
            >
              회원가입
            </button>
          </div>
          <button
            onClick={loginWithGoogle}
            className="bg-red-500 text-white px-3 py-1 rounded w-full"
          >
            Google로 로그인
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
