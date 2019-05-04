import { RichText as RichTextType } from '../generated/prisma-client';
import { prismaObjectType } from 'nexus-prisma';
import * as sanitizeHtml from 'sanitize-html';

const getText = (html: string): string => {
  return sanitizeHtml(html, {
    allowedAttributes: {},
    allowedTags: [],
  });
};

export const createRichText = (raw: string): RichTextType => {
  const html = sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  });
  return {
    html,
    text: getText(html),
  };
};

export const RichText = prismaObjectType({
  name: 'RichText',
  definition(t) {
    t.prismaFields(['*']);
  },
});
