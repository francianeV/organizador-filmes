export type PlataformaEntity = {
    id?: number,
    nome: string 
};

export type Plataforma = Omit<PlataformaEntity, "id">;