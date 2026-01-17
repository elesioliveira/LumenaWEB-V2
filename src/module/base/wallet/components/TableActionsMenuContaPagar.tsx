import { useState, type MouseEvent } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Ellipsis } from "lucide-react";

interface TableActionsMenuProps {
  rowId: number;
  onView: (id: number) => void;
}
export function TableActionsMenuContaPagar({ rowId,  onView,}: TableActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`Ação: ${action} | ID: ${rowId}`);
    handleClose();
  };
  
  const handleView = () => {
    onView(rowId);
    handleClose();
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
        <MenuItem onClick={handleView}>Visualizar</MenuItem>

        <MenuItem onClick={() => handleAction("marcar_como_pago")}>
          Marcar como pago
        </MenuItem>

        <MenuItem onClick={() => handleAction("editar")}>
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
