export class Category extends Base {
  name: string;
  parentCategoryId: number;
  parentCategoryName: string;
}

export class CategoryCreate extends Base {
  name: string;
  parentCategoryId: number;
}

export class CategoryShort extends Base {
  name: string;
}
