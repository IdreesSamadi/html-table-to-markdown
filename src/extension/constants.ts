export const TABLE = /<table\b[^>]*>([\s\S]*?)<\/table>/i;
export const HEADER = /<th\b[^>]*>([\s\S]*?)<\/th>/gi;
export const ROW = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
export const CELL = /<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi;
export const CELL_CONTENT = /<[^>]+>/g;
