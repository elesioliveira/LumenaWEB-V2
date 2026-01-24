import { useState, type MouseEvent } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Ellipsis } from "lucide-react";

interface TableActionsMenuContaReceberProps {
  rowId: number;
  handleActionVisualizar:() => void;
  handleActionMarcarComoRecebido: () => Promise<void>;
  handleEditarConta: () => void;
}

export function TableActionsMenuContaReceber({ rowId,handleActionVisualizar,handleActionMarcarComoRecebido,handleEditarConta }: TableActionsMenuContaReceberProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAction = (value: string) => {
   console.log(value);
  };



  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <Ellipsis size={18} color="white" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            bgcolor: "#0F172A",
            color: "#fff",
            borderRadius: 1,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={() => handleActionVisualizar()}>
          Visualizar
        </MenuItem>

        <MenuItem onClick={async() => handleActionMarcarComoRecebido()}>
          Marcar como recebido
        </MenuItem>

        <MenuItem onClick={() => handleEditarConta()}>
          Editar
        </MenuItem>

        <MenuItem
          onClick={() => handleAction("excluir")}
          sx={{ color: "#FF2E2E" }}
        >
          Excluir
        </MenuItem>
      </Menu>
    </>
  );
}
