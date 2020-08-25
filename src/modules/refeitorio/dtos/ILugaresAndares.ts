export interface ILugaresAndares {
	mesas: IMesa[];
}

export interface IMesa {
	agendamentos: [];
	mesa: number | string;
	andar: number | string;
	status: string;
	usuarioId: string;
}
