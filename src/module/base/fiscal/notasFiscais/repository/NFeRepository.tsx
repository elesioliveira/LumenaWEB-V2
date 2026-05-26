import { api } from "../../../../../shared/HttpManager";
import { type CancelarNFeDTO, type ConfigFiscalEmpresaDTO, type EmitirNFeDTO, type InutilizarNFeDTO, type UploadCertificadoDTO } from "../dto/NFeDTO";

export const emitirNFe = async (dto: EmitirNFeDTO) => {
  return await api.post("Post/Emitir/NFe", dto, { withCredentials: true });
};

export const cancelarNFe = async (dto: CancelarNFeDTO) => {
  return await api.post("Post/Cancelar/NFe", dto, { withCredentials: true });
};

export const inutilizarNFe = async (dto: InutilizarNFeDTO) => {
  return await api.post("Post/Inutilizar/NFe", dto, { withCredentials: true });
};

export const getHistoricoNFe = async (status?: string | null, modelo?: number | null) => {
  const params: Record<string, string | number> = {};
  if (status) params.status = status;
  if (modelo) params.modelo = modelo;
  return await api.get("Get/NFe/Historico", { params, withCredentials: true });
};

export const getStatusSefaz = async () => {
  return await api.get("Get/NFe/StatusSefaz", { withCredentials: true });
};

export const uploadCertificado = async (dto: UploadCertificadoDTO) => {
  return await api.post("Post/Upload/Certificado", dto, { withCredentials: true });
};

export const getCertificado = async () => {
  return await api.get("Get/Certificado", { withCredentials: true });
};

export const updateConfigFiscal = async (dto: ConfigFiscalEmpresaDTO) => {
  return await api.put("Put/Update/ConfigFiscal", dto, { withCredentials: true });
};

export const downloadNFePdf = async (id: number) => {
  const resp = await api.get(`Get/NFe/Pdf/${id}`, { withCredentials: true, responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([resp.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `danfe_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadNFeXml = async (id: number) => {
  const resp = await api.get(`Get/NFe/Xml/${id}`, { withCredentials: true, responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([resp.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `nfe_${id}.xml`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const cartaCorrecaoNFe = async (notaFiscalId: number, correcao: string, sequencia: number = 1) => {
  return await api.post("Post/CartaCorrecao/NFe", { nota_fiscal_id: notaFiscalId, correcao, sequencia }, { withCredentials: true });
};
