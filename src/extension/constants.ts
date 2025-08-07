// Command constants
export const COMMAND_CONVERT = 'html-table-to-markdown.convert';
export const COMMAND_FORMAT = 'html-table-to-markdown.format';

// Regular expressions for HTML table parsing
export const TABLE = /<table\b[^>]*>([\s\S]*?)<\/table>/i;
export const T_HEADER = /<thead\b[^>]*>([\s\S]*?)<\/thead>/gi;
export const HEADER = /<th\b[^>]*>([\s\S]*?)<\/th>/gi;
// export const ROW = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
export const ROW_WITHOUT_HEADER = /<tr\b[^>]*>(?:(?!<th\b)[\s\S])*?<\/tr>/gi;
export const CELL = /<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi;
export const CELL_CONTENT = /<[^>]+>/g;
export const TABLE_CAPTION = /<caption\b[^>]*>([\s\S]*?)<\/caption>/i;
