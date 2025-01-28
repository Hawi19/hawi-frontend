import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  // Extract the query parameter 'token' from the URL

  const params = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        await axios.get(
          `https://email-verification-bphi.onrender.com/user/verify?token=${params.token}`
        );
        enqueueSnackbar("Email verified successfully!", { variant: "success" });
        navigate("/");
      } catch (error) {
        enqueueSnackbar("Invalid or expired token", { variant: "error" });
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail(); 
  }, []);

  return (
    <div>
      <h1>Email Verification</h1>

      {loading ? (
        <p>Please wait while we verify your email...</p>
      ) : (
        <p>Email verification completed.</p>
      )}
    </div>
  );
};

export default VerifyEmail;