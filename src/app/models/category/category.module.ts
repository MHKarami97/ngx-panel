export class Category {
  id: number;
  name: string;
  parentCategoryId: number;
  parentCategoryName: string;
}

export class CategoryCreate {
  id: number;
  name: string;
  parentCategoryId: number;
}

export class CategoryShort {
  id: number;
  name: string;
}
