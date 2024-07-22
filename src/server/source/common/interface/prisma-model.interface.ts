export interface PrismaModelInterface<ModelType> {
    findMany(options?: any): Promise<ModelType[]>;
    findUnique(options?: any): Promise<ModelType>;
    findFirst(options?: any): Promise<ModelType>;
    create(options?: any): Promise<ModelType>;
    update(options?: any): Promise<ModelType>;
    delete(options?: any): Promise<ModelType>;
}

export interface PrismaDetailedModelInterface<ModelType, ModelDetailedtype extends ModelType>
    extends PrismaModelInterface<ModelType> {
    findMany(options?: any): Promise<ModelDetailedtype[]>;
    findUnique(options?: any): Promise<ModelDetailedtype>;
    findFirst(options?: any): Promise<ModelDetailedtype>;
}
