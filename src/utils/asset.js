// Monta o caminho de arquivos da pasta /public respeitando o "base" do Vite
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
