
import { useCallback, useState } from "react";
import type { CompanyEntityRegister } from "../entities/AuthEntities";
import { createCompany } from "../repository/AuthRepository";

export function useRegisterController() {
  const [company, setCompany] = useState<CompanyEntityRegister>({
    razao_social: "",
    nome_responsavel: "",
    cnpj: "",
    email: "",
    senha: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeCompany = <K extends keyof CompanyEntityRegister>(
    key: K,
    value: CompanyEntityRegister[K]
  ) => {
    setCompany((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

const createCompanySubmit = useCallback(async () => {
  try {
    setLoading(true);
    const result = await createCompany(company);

    if (!result?.success) {
      setError(result?.message ?? "Erro ao criar empresa.");
      return false;
    }

    return true;
  } catch (err: any) {
    setError(err.message);
    return false;
  } finally {
    setLoading(false);
  }
}, [company]);

  return {
    company,
    isLoading,
    error,
    handleChangeCompany,
    createCompanySubmit,
  };
}
