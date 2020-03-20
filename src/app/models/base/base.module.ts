interface IBase<T> {
  id: T;
}

abstract class Base implements IBase<number> {
  id: number;
}
