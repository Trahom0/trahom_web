export type TemplateValues = Record<string, string | number>;

export const formatTemplate = (template: string, values: TemplateValues) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ''));
