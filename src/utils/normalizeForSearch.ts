export const normalizeForSearch = (texto?: string | null) => {
  if (!texto) {
    return ''
  }
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
