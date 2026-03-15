export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}
