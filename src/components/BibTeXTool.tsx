'use client';

import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    TextField,
    Card,
    Heading,
    Separator,
    Select,
    TextArea
} from '@radix-ui/themes';
import { CopyIcon, ResetIcon, DownloadIcon, CodeIcon } from '@radix-ui/react-icons';
import { CitationType } from '@/types/citation';

interface BibTeXToolProps {
    // Empty interface for future props
}

interface BibTeXFormData {
    type: CitationType;
    citationKey: string;
    authors: string;
    title: string;
    year: number;
    // Journal specific
    journalName?: string;
    volume?: string;
    number?: string;
    pages?: string;
    // Book specific
    publisher?: string;
    address?: string;
    // Conference specific
    booktitle?: string;
    // Common
    doi?: string;
    url?: string;
    note?: string;
}

export default function BibTeXTool({ }: BibTeXToolProps) {
    const [formData, setFormData] = useState<BibTeXFormData>({
        type: 'journal',
        citationKey: '',
        authors: '',
        title: '',
        year: new Date().getFullYear(),
    });

    const [bibtexOutput, setBibtexOutput] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const bibTexTypes: { value: CitationType; label: string; bibType: string }[] = [
        { value: 'journal', label: 'Journal Article', bibType: 'article' },
        { value: 'conference', label: 'Conference Paper', bibType: 'inproceedings' },
        { value: 'book', label: 'Book', bibType: 'book' },
        { value: 'website', label: 'Website', bibType: 'misc' },
        { value: 'standard', label: 'Standard', bibType: 'techreport' },
    ];

    const updateField = (field: keyof BibTeXFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateBibTeX = () => {
        const selectedType = bibTexTypes.find(t => t.value === formData.type);
        const bibType = selectedType?.bibType || 'misc';

        let bibtex = `@${bibType}{${formData.citationKey || 'key' + formData.year},\n`;

        // Add fields based on type
        if (formData.authors) {
            bibtex += `  author = {${formData.authors}},\n`;
        }

        if (formData.title) {
            bibtex += `  title = {${formData.title}},\n`;
        }

        // Type-specific fields
        switch (formData.type) {
            case 'journal':
                if (formData.journalName) bibtex += `  journal = {${formData.journalName}},\n`;
                if (formData.volume) bibtex += `  volume = {${formData.volume}},\n`;
                if (formData.number) bibtex += `  number = {${formData.number}},\n`;
                if (formData.pages) bibtex += `  pages = {${formData.pages}},\n`;
                break;
            case 'conference':
                if (formData.booktitle) bibtex += `  booktitle = {${formData.booktitle}},\n`;
                if (formData.pages) bibtex += `  pages = {${formData.pages}},\n`;
                break;
            case 'book':
                if (formData.publisher) bibtex += `  publisher = {${formData.publisher}},\n`;
                if (formData.address) bibtex += `  address = {${formData.address}},\n`;
                break;
            case 'website':
                if (formData.url) bibtex += `  url = {${formData.url}},\n`;
                bibtex += `  howpublished = {\\url{${formData.url || 'URL'}}},\n`;
                break;
            case 'standard':
                if (formData.publisher) bibtex += `  institution = {${formData.publisher}},\n`;
                break;
        }

        bibtex += `  year = {${formData.year}},\n`;

        if (formData.doi) {
            bibtex += `  doi = {${formData.doi}},\n`;
        }

        if (formData.note) {
            bibtex += `  note = {${formData.note}},\n`;
        }

        // Remove trailing comma and add closing brace
        bibtex = bibtex.replace(/,\n$/, '\n');
        bibtex += '}';

        setBibtexOutput(bibtex);
    };

    const copyBibTeX = () => {
        navigator.clipboard.writeText(bibtexOutput);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const downloadBibTeX = () => {
        const blob = new Blob([bibtexOutput], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.citationKey || 'citation'}.bib`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const clearForm = () => {
        setFormData({
            type: 'journal',
            citationKey: '',
            authors: '',
            title: '',
            year: new Date().getFullYear(),
        });
        setBibtexOutput('');
        setShowCopySuccess(false);
    };

    return (
        <Card className="w-full bg-white/70 backdrop-blur-sm shadow-2xl border-0 p-6">
            <Heading size="5" className="mb-4 text-center">
                BibTeX Citation Generator
            </Heading>
            <Text size="3" className="text-gray-600 text-center mb-6 block">
                Generate BibTeX citations for LaTeX documents. Perfect for academic papers and theses.
            </Text>

            <Flex direction="column" gap="4">
                {/* Citation Type and Key */}
                <Flex gap="4" wrap="wrap">
                    <Box className="flex-1 min-w-48">
                        <Text size="2" weight="medium" className="mb-2 block">
                            Citation Type
                        </Text>
                        <Select.Root value={formData.type} onValueChange={(value) => updateField('type', value as CitationType)}>
                            <Select.Trigger className="w-full" />
                            <Select.Content>
                                {bibTexTypes.map((type) => (
                                    <Select.Item key={type.value} value={type.value}>
                                        {type.label} (@{type.bibType})
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </Box>
                    <Box className="flex-1 min-w-48">
                        <Text size="2" weight="medium" className="mb-2 block">
                            Citation Key
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., smith2024neural"
                            value={formData.citationKey}
                            onChange={(e) => updateField('citationKey', e.target.value)}
                        />
                    </Box>
                </Flex>

                {/* Authors and Title */}
                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Authors
                    </Text>
                    <TextField.Root
                        size="3"
                        placeholder="e.g., John K. Smith and Jane A. Doe"
                        value={formData.authors}
                        onChange={(e) => updateField('authors', e.target.value)}
                    />
                </Box>

                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Title
                    </Text>
                    <TextField.Root
                        size="3"
                        placeholder="Publication title"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                    />
                </Box>

                {/* Type-specific fields */}
                {formData.type === 'journal' && (
                    <>
                        <Box>
                            <Text size="2" weight="medium" className="mb-2 block">
                                Journal Name
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., IEEE Transactions on Neural Networks"
                                value={formData.journalName || ''}
                                onChange={(e) => updateField('journalName', e.target.value)}
                            />
                        </Box>
                        <Flex gap="4" wrap="wrap">
                            <Box className="flex-1 min-w-32">
                                <Text size="2" weight="medium" className="mb-2 block">
                                    Volume
                                </Text>
                                <TextField.Root
                                    size="3"
                                    placeholder="e.g., 25"
                                    value={formData.volume || ''}
                                    onChange={(e) => updateField('volume', e.target.value)}
                                />
                            </Box>
                            <Box className="flex-1 min-w-32">
                                <Text size="2" weight="medium" className="mb-2 block">
                                    Number
                                </Text>
                                <TextField.Root
                                    size="3"
                                    placeholder="e.g., 3"
                                    value={formData.number || ''}
                                    onChange={(e) => updateField('number', e.target.value)}
                                />
                            </Box>
                            <Box className="flex-1 min-w-32">
                                <Text size="2" weight="medium" className="mb-2 block">
                                    Pages
                                </Text>
                                <TextField.Root
                                    size="3"
                                    placeholder="e.g., 123--135"
                                    value={formData.pages || ''}
                                    onChange={(e) => updateField('pages', e.target.value)}
                                />
                            </Box>
                        </Flex>
                    </>
                )}

                {formData.type === 'conference' && (
                    <>
                        <Box>
                            <Text size="2" weight="medium" className="mb-2 block">
                                Conference/Proceedings Title
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., Proceedings of the IEEE Conference on Computer Vision"
                                value={formData.booktitle || ''}
                                onChange={(e) => updateField('booktitle', e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Text size="2" weight="medium" className="mb-2 block">
                                Pages
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., 123--135"
                                value={formData.pages || ''}
                                onChange={(e) => updateField('pages', e.target.value)}
                            />
                        </Box>
                    </>
                )}

                {(formData.type === 'book' || formData.type === 'standard') && (
                    <>
                        <Box>
                            <Text size="2" weight="medium" className="mb-2 block">
                                Publisher
                            </Text>
                            <TextField.Root
                                size="3"
                                placeholder="e.g., IEEE Press"
                                value={formData.publisher || ''}
                                onChange={(e) => updateField('publisher', e.target.value)}
                            />
                        </Box>
                        {formData.type === 'book' && (
                            <Box>
                                <Text size="2" weight="medium" className="mb-2 block">
                                    Address
                                </Text>
                                <TextField.Root
                                    size="3"
                                    placeholder="e.g., New York, NY"
                                    value={formData.address || ''}
                                    onChange={(e) => updateField('address', e.target.value)}
                                />
                            </Box>
                        )}
                    </>
                )}

                {formData.type === 'website' && (
                    <Box>
                        <Text size="2" weight="medium" className="mb-2 block">
                            URL
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="https://example.com"
                            value={formData.url || ''}
                            onChange={(e) => updateField('url', e.target.value)}
                        />
                    </Box>
                )}

                {/* Common fields */}
                <Flex gap="4" wrap="wrap">
                    <Box className="flex-1 min-w-32">
                        <Text size="2" weight="medium" className="mb-2 block">
                            Year
                        </Text>
                        <TextField.Root
                            size="3"
                            type="number"
                            placeholder="2024"
                            value={formData.year.toString()}
                            onChange={(e) => updateField('year', parseInt(e.target.value) || new Date().getFullYear())}
                        />
                    </Box>
                    <Box className="flex-1 min-w-48">
                        <Text size="2" weight="medium" className="mb-2 block">
                            DOI (Optional)
                        </Text>
                        <TextField.Root
                            size="3"
                            placeholder="e.g., 10.1109/TNNLS.2024.1234567"
                            value={formData.doi || ''}
                            onChange={(e) => updateField('doi', e.target.value)}
                        />
                    </Box>
                </Flex>

                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Note (Optional)
                    </Text>
                    <TextField.Root
                        size="3"
                        placeholder="Additional notes"
                        value={formData.note || ''}
                        onChange={(e) => updateField('note', e.target.value)}
                    />
                </Box>

                {/* Action Buttons */}
                <Flex gap="3" justify="center" className="mt-6">
                    <Button
                        size="3"
                        variant="classic"
                        color="gray"
                        highContrast
                        onClick={generateBibTeX}
                        className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        <CodeIcon />
                        Generate BibTeX
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        color="gray"
                        highContrast
                        onClick={clearForm}
                    >
                        <ResetIcon /> Clear Form
                    </Button>
                </Flex>
            </Flex>

            <Separator className="my-6" />

            {/* BibTeX Output */}
            {bibtexOutput && (
                <Box className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Flex justify="between" align="center" className="mb-3">
                        <Text size="3" weight="medium" className="text-gray-800">
                            Generated BibTeX
                        </Text>
                        <Flex gap="2">
                            <Button
                                size="2"
                                variant="outline"
                                color="gray"
                                highContrast
                                onClick={copyBibTeX}
                                disabled={showCopySuccess}
                            >
                                <CopyIcon />
                                {showCopySuccess ? 'Copied!' : 'Copy'}
                            </Button>
                            <Button
                                size="2"
                                variant="outline"
                                color="gray"
                                highContrast
                                onClick={downloadBibTeX}
                            >
                                <DownloadIcon />
                                Download .bib
                            </Button>
                        </Flex>
                    </Flex>
                    <TextArea
                        value={bibtexOutput}
                        readOnly
                        rows={10}
                        className="w-full font-mono text-sm bg-white"
                        style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
                    />
                </Box>
            )}

            {/* Format Information */}
            <Box className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Text size="3" weight="medium" className="mb-2 block">
                    About BibTeX Format
                </Text>
                <Text size="2" className="text-gray-600 leading-relaxed">
                    BibTeX is a reference management system for LaTeX documents. The generated .bib file can be used with LaTeX packages like \cite{"{"}key{"}"} to automatically format citations and bibliographies according to various academic styles.
                </Text>
            </Box>
        </Card>
    );
}
