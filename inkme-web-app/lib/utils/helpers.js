export function mapFirestoreDoc(doc, idField = "id") {
  return { ...doc.data(), [`${idField}`]: doc.id };
}

export function mapFirestoreCol(col, idField = "id") {
  return col.docs.map((doc) => mapFirestoreDoc(doc, idField));
}
