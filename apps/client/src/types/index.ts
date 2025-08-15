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

//Form Submission
export interface FieldResponses {
  id: string,
  formFieldId: string;
  responsesId: string;
  answer: any
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmissionType {
  id: string;
  name: string;
  workspaceId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  formFields: FormQuesAns[];
};

export interface FormQuesAns extends FormField {
  fieldResponses: FieldResponses[];
};