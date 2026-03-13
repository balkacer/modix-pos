export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly categoryId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly price: number,
    public readonly isActive: boolean
  ) {}
}