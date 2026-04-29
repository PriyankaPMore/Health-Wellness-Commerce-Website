import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products')
        .child(
          S.documentTypeList('product').title('Products')
        ),

      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category').title('Categories')
        ),
    ])