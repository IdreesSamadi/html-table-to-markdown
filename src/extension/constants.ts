export const TABLE = /<table>([\s\S]*?)<\/table>/i;
export const HEADER = /<th>([\s\S]*?)<\/th>/gi;
export const ROW = /<tr>([\s\S]*?)<\/tr>/gi;
export const CELL = /<(th|td)>([\s\S]*?)<\/\1>/gi;
export const CELL_CONTENT = /<[^>]+>/g;
