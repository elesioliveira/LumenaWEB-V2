export interface NFeData {
  numero: string;
  dataEmissao: string;
  fornecedor: {
    cnpj: string;
    nome: string;
  };
  valorTotal: number;
  itens: NFeItem[];
}

export interface NFeItem {
  ean: string;
  nome: string;
  unidade: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

function stripNamespaces(xml: string): string {
  return xml
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/\sxmlns(?::\w+)?="[^"]*"/g, "")
    .replace(/<(\/?)\w+:/g, "<$1");
}

function getTagText(parent: Element, tagName: string): string {
  const el = parent.getElementsByTagName(tagName)[0];
  return el?.textContent?.trim() ?? "";
}

function getTagNumber(parent: Element, tagName: string): number {
  const text = getTagText(parent, tagName);
  return text ? parseFloat(text) : 0;
}

export function parseNFeXml(xmlString: string): NFeData {
  const cleanXml = stripNamespaces(xmlString);
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanXml, "text/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Arquivo XML inválido ou corrompido.");
  }

  const infNFe =
    doc.getElementsByTagName("infNFe")[0] ??
    doc.getElementsByTagName("NFe")[0] ??
    doc.documentElement;

  const ide = infNFe.getElementsByTagName("ide")[0];
  const emit = infNFe.getElementsByTagName("emit")[0];
  const icmsTot = infNFe.getElementsByTagName("ICMSTot")[0];

  const numero = ide ? getTagText(ide, "nNF") : "";
  const dhEmi = ide ? getTagText(ide, "dhEmi") : "";
  const dataEmissao = dhEmi ? dhEmi.substring(0, 10) : "";

  const fornecedorCnpj = emit ? getTagText(emit, "CNPJ") : "";
  const fornecedorNome = emit ? getTagText(emit, "xNome") : "";

  const valorTotal = icmsTot ? getTagNumber(icmsTot, "vNF") : 0;

  const detElements = infNFe.getElementsByTagName("det");
  const itens: NFeItem[] = [];

  for (let i = 0; i < detElements.length; i++) {
    const det = detElements[i];
    const prod = det.getElementsByTagName("prod")[0];
    if (!prod) continue;

    let ean = getTagText(prod, "cEAN");
    if (!ean || ean === "SEM GTIN" || ean === "0") {
      ean = getTagText(prod, "cEANTrib");
    }
    if (ean === "SEM GTIN" || ean === "0") {
      ean = "";
    }

    const nome = getTagText(prod, "xProd");
    const unidade = getTagText(prod, "uCom").toUpperCase();
    const quantidade = getTagNumber(prod, "qCom");
    const valorUnitario = getTagNumber(prod, "vUnCom");
    const subtotal = getTagNumber(prod, "vProd");

    itens.push({ ean, nome, unidade, quantidade, valorUnitario, subtotal });
  }

  return {
    numero,
    dataEmissao,
    fornecedor: { cnpj: fornecedorCnpj, nome: fornecedorNome },
    valorTotal,
    itens,
  };
}
