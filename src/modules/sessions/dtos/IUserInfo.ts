export interface IUserInfo {
  numeroCPF: string;
  loginColaborador: string;
  numeroMatricula: number;
  primeiroNome: string;
  nomeCompleto: string;
  enderecoEmail: string;
  codigoEmpresa: number;
  listaGrupoAD: ListaGrupoAd[];
  identificadorGestor: boolean;
  isTerceiro: boolean;
}

export interface ListaGrupoAd {
  grupoAD: string;
  identificadorGestor: boolean;
}
