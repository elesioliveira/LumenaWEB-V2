import { unidadeMock } from "../../../../../shared/Mocks";

export const getUnidadeDescricao = (id?: number | string): string | null => {
  const unidade = unidadeMock.find(
    (u) => u.id === Number(id)
  );

  return unidade?.nome ?? null;
};