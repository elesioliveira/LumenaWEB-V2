import { useMemo, useRef, useState } from "react";
import { CurrentSaleViewEnum } from "../enums/SalesEnums";
import type { Canais, ClientSalesEntity, Entrega, SaleDetailsModalEntity } from "../entity/SalesEntity";
import React from "react";
import type { Dayjs } from "dayjs";
import type { SaleItensFormDTO } from "../dto/SaleDTO";
import Decimal from "decimal.js";
import dayjs from "dayjs";


export function useSalesController() {
  const [currentPage, setPage] = useState<CurrentSaleViewEnum>(CurrentSaleViewEnum.Order);
  const [saleId, setSaleId] = useState<number | null>(null);
  const [statusOfSale, setStatusOfSale] = useState<string | null>("Pendente");
  const [canal, setCanalDeVenda] = useState<Canais | null>(null);
  const [metodo, setMetodoEntrega] = useState<Entrega | null>(null);
  const [dataPedido, setDatePedido] = React.useState<Dayjs | null>(null);
  const [itens, setItens] = useState<SaleItensFormDTO[]>([]);
  const [clientSelected, setClient] = useState<ClientSalesEntity | null>(null);
  const observacaoRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const valFrete = metodo?.custo ?? 0;
  const totalItens = itens.length??0;
  const desconto = clientSelected?.desconto??0;
  const precoTotalItens = useMemo(() => {
    return itens.reduce((total, item) => {
      const quantidade = item.quantidade ?? 0;
      const valorUnitario = item.valor_unitario ?? 0;
      return total + quantidade * valorUnitario;
    }, 0);
  }, [itens]);
  const precoTotal = useMemo(() => {
  const descontoPercentual = desconto ?? 0;
    return new Decimal(precoTotalItens)
      .plus(valFrete)
      .mul(new Decimal(1).minus(new Decimal(descontoPercentual).div(100)))
      .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      .toNumber();
  }, [precoTotalItens, valFrete, desconto]);

  function onChangedCurrentPage(currentPage: CurrentSaleViewEnum) {
    setPage(currentPage);
    if (currentPage === CurrentSaleViewEnum.Order) {
      restForm();
    }
  }
  const onDeleteItem = (index: number) => {
  setItens((prev) => prev.filter((_, i) => i !== index));
};

function hydrateFromApi(data: SaleDetailsModalEntity) {
  // status
  setStatusOfSale(data.status ??"Pendente"); // ou data.status se existir futuramente
  setSaleId(data.id);
  // cliente
  setClient({
    id: data.cliente_id,
    nome: data.cliente,
    desconto: data.desconto,
  } as ClientSalesEntity);

  // canal
  setCanalDeVenda(
    data.canal_id
      ? ({ id: data.canal_id, nome: data.canal } as Canais)
      : null
  );

  // entrega
  setMetodoEntrega(
    data.entrega_id
      ? ({
          id: data.entrega_id,
          nome: data.entrega,
          custo: data.val_frete,
        } as Entrega)
      : null
  );

  // data
  setDatePedido(data.data_pedido ? dayjs(data.data_pedido) : null);

  // observação (ref)
  requestAnimationFrame(() => {
    if (observacaoRef.current) {
      observacaoRef.current.value = data.observacao ?? "";
    }
  });

  // itens
  setItens(
    data.itens.map((item) => ({
      produto_id: item.id,
      nome: item.produto,
      quantidade: item.qtd,
      valor_unitario: item.val_un,
      sub_total: item.sub_total,
    }))
  );

  // muda página por último
  setPage(CurrentSaleViewEnum.NewSale);
}


const restForm = () => {
  setSaleId(null);
setStatusOfSale("Pendente");
setCanalDeVenda(null);
setMetodoEntrega(null);
setDatePedido(null);
setItens([]);
setClient(null);
if (observacaoRef.current) {
  observacaoRef.current.value = "";
};
};

  return {
    statusOfSale,
    currentPage,
    canal,
    metodo,
    dataPedido,
    itens,
    clientSelected,
    observacaoRef,
    valFrete,
    totalItens,
    desconto,
    precoTotalItens,
    precoTotal,
    saleId,
    setStatusOfSale,
    setCanalDeVenda,
    setMetodoEntrega,
    setDatePedido,
    setItens,
    setClient,
    onDeleteItem,
    restForm,
    onChangedCurrentPage,
    hydrateFromApi
  };
}