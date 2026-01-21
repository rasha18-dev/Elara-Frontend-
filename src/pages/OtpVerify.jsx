import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>OTP VERIFY PAGE</h2>

      <button onClick={() => navigate("/reset-password")}>
        Go to Reset Password
      </button>
    </div>
  );
}
