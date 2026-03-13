export class BranchEntity {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly code: string,
    public readonly name: string
  ) {}
}