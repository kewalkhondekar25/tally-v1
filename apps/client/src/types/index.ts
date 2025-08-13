//PublishedForm

export interface FormField {
  id: string;
  formId: string;
  blockId: number;
  blockName: string;
  blockIndex: number;
  blockQuestion: string;
  blockPlaceholder: string | null;
  blockOptions: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export interface File {
  id: string;
  name: string;
  workspaceId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  formFields: FormField[];
};