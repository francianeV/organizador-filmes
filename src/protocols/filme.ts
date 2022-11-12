export type FilmeEntity = {
    id?: number,
    nome: string,
    genero: string,
    plataformaId: number,
    status?: boolean,
    nota?: string
}

export type Filme = Omit<FilmeEntity, "id">