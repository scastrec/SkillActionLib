export interface Entity {
    id: string;
    name: string
    values: Array<{
        synonyms: Array<string>;
        id: string;
        name: string;
    }>
}

export interface DynamicEntities {
    updateEntities(entities: Array<Entity>);
    deleteEntity(entity);
}