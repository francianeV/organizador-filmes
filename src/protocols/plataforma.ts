export type PlataformaEntity = {
    id?: number,
    name: string 
};

export type Plataforma = Omit<PlataformaEntity, "id">;