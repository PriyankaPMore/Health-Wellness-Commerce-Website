export const structure = (S: any) =>
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