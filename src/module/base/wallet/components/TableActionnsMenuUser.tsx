import { useState, type MouseEvent } from "react";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import { Ellipsis, KeyRound, Pencil, UserCheck, UserRoundX } from "lucide-react";
import { colorNegative, colorPositive, primaryColor, shopIconColor } from "../../../../theme/theme";

interface TableActionsMenuProps {
  edit: () => void;
  permissao: ()=> void;
  active: ()=> void;
 userActive: boolean;
}
export function TableActionsMenuUser({edit, permissao, active,userActive}: TableActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={edit}>
          <ListItemIcon sx={{ minWidth: 36, color: "#38bdf8" }}>
            <Pencil size={18} color={primaryColor}/>
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>

        <MenuItem onClick={permissao}>
          <ListItemIcon sx={{ minWidth: 36, color: "#38bdf8" }}>
            <KeyRound size={18} color={shopIconColor} />
          </ListItemIcon>
          <ListItemText primary="Ver permissão" />
        </MenuItem>

        <MenuItem onClick={active}>
          <ListItemIcon sx={{ minWidth: 36, color: "#38bdf8" }}>
            {!userActive? <UserCheck size={18} color={colorPositive}/> : <UserRoundX size={18} color={colorNegative}/>}
          </ListItemIcon>
          <ListItemText primary={userActive? 'Desativar' : "Ativar"} />
        </MenuItem>


      </Menu>
    </>
  );
}
