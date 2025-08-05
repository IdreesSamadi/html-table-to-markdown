import { CliPrettify } from 'markdown-table-prettify';

export const formatMarkdownTable = (markdown: string): string => {
  return CliPrettify.prettify(markdown);
};
