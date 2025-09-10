// Citation types for IEEE format generator

export type CitationType = 'book' | 'journal' | 'conference' | 'website' | 'standard' | 'image';

export type InputMethod = 'manual' | 'doi' | 'pdf';

export type OutputFormat = 'text' | 'bibtex' | 'latex';

export interface Author {
    firstName: string;
    lastName: string;
    middleInitial?: string;
}

export interface BaseCitation {
    id?: string;
    type: CitationType;
    authors: Author[];
    title: string;
    year: number;
    doi?: string;
    url?: string;
    accessDate?: string;
}

export interface BookCitation extends BaseCitation {
    type: 'book';
    publisher: string;
    city: string;
    edition?: string;
    volume?: string;
    isbn?: string;
}

export interface JournalCitation extends BaseCitation {
    type: 'journal';
    journalName: string;
    volume?: string;
    issue?: string;
    pages?: string;
    month?: string;
}

export interface ConferenceCitation extends BaseCitation {
    type: 'conference';
    conferenceName: string;
    location?: string;
    pages?: string;
    month?: string;
}

export interface WebsiteCitation extends BaseCitation {
    type: 'website';
    websiteName?: string;
    organization?: string;
    accessDate: string;
}

export interface StandardCitation extends BaseCitation {
    type: 'standard';
    standardNumber: string;
    organization: string;
}

export interface ImageCitation extends BaseCitation {
    type: 'image';
    source: string;
    caption?: string;
    medium?: string;
}

export type Citation =
    | BookCitation
    | JournalCitation
    | ConferenceCitation
    | WebsiteCitation
    | StandardCitation
    | ImageCitation;

export interface CitationFormData {
    [key: string]: string | number | boolean | undefined;
}

export interface RouteParams {
    type?: CitationType;
    input?: InputMethod;
    output?: OutputFormat;
}
