import { useCallback, useState } from "react";
import { forgotPassword } from "../repository/AuthRepository";

export function useForgotPasswordController() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitForm = useCallback(async () => {
    try {
      if (!email || email.trim() === "") {
        setError("Informe um e-mail válido.");
        return false;
      }

      setLoading(true);

      const result = await forgotPassword(email);

      if (!result.success) {
        setError(result.message ?? "Erro ao enviar link.");
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [email]);

  return {
    email,
    isLoading,
    error,
    setEmail,
    handleSubmitForm,
    setError,
  };
}
