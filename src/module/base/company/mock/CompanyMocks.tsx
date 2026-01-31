import type { PerfilUser } from "../dto/ComapnyDTO";
import type { User } from "../entities/UsersEntity";

export const perfilUser: PerfilUser []= [
  {value: 1, label:"Administrador"},
  {value: 2, label:"Gerente"},
  {value: 3, label:"Vendedor"},
  {value: 4, label:"Suporte"},
];

export const perfilUserTab = [
  "Todos", "Administrador", "Gerente", "Vendedor", "Suporte"
];

export const statusTab = [
"Todos", "Ativo", "Inativo"
];

export const usersMock: User[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    perfil: "Administrador",
    status: "Ativo",
    ultimo_acesso: "2026-01-27 14:32",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    perfil: "Usuário",
    status: "Ativo",
    ultimo_acesso: "2026-01-28 09:15",
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    perfil: "Usuário",
    status: "Inativo",
    ultimo_acesso: "2025-12-18 18:47",
  },
  {
    id: 4,
    nome: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    perfil: "Gerente",
    status: "Ativo",
    ultimo_acesso: "2026-01-29 08:02",
  },
  {
    id: 5,
    nome: "Lucas Rodrigues",
    email: "lucas.rodrigues@email.com",
    perfil: "Usuário",
    status: "Ativo",
    ultimo_acesso: "2026-01-29 10:41",
  },
  {
    id: 6,
    nome: "Patrícia Nunes",
    email: "patricia.nunes@email.com",
    perfil: "Suporte",
    status: "Bloqueado",
    ultimo_acesso: "2025-11-03 16:20",
  },
];