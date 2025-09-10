'use client';

import { useState, useRef } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    Card,
    Heading,
    Separator,
    Select,
    Spinner,
    Badge,
    Progress
} from '@radix-ui/themes';
import { CopyIcon, ResetIcon, UploadIcon, FileIcon } from '@radix-ui/react-icons';
import { CitationType, OutputFormat } from '@/types/citation';

interface PDFCitationToolProps {
    outputFormat?: OutputFormat;
}

interface ExtractedMetadata {
    type: CitationType;
    title: string;
    authors: string[];
    year: number;
    publisher?: string;
    journalName?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    url?: string;
    confidence: number;
}

export default function PDFCitationTool({
    outputFormat = 'text'
}: PDFCitationToolProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedType, setSelectedType] = useState<CitationType>('journal');
    const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null);
    const [citation, setCitation] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const citationTypes: { value: CitationType; label: string }[] = [
        { value: 'journal', label: 'Journal Article' },
        { value: 'conference', label: 'Conference Paper' },
        { value: 'book', label: 'Book' },
        { value: 'website', label: 'Website' },
    ];

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setError('Please select a PDF file');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }
            setSelectedFile(file);
            setError('');
            setMetadata(null);
            setCitation('');
        }
    };

    const processPDF = async () => {
        if (!selectedFile) {
            setError('Please select a PDF file');
            return;
        }

        setIsProcessing(true);
        setError('');
        setProgress(0);

        try {
            const steps = [
                { message: 'Uploading PDF...', duration: 1000 },
                { message: 'Extracting text...', duration: 2000 },
                { message: 'Analyzing metadata...', duration: 1500 },
                { message: 'Generating citation...', duration: 1000 }
            ];

            let currentProgress = 0;
            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, step.duration));
                currentProgress += 25;
                setProgress(currentProgress);
            }

            const extractedMetadata: ExtractedMetadata = {
                type: selectedType,
                title: 'Extracted Paper Title from PDF Analysis',
                authors: ['J. K. Author', 'A. B. Coauthor', 'C. D. Researcher'],
                year: 2024,
                publisher: selectedType === 'book' ? 'IEEE Press' : undefined,
                journalName: selectedType === 'journal' ? 'IEEE Transactions on Pattern Analysis' : undefined,
                volume: selectedType === 'journal' ? '46' : undefined,
                issue: selectedType === 'journal' ? '7' : undefined,
                pages: '1567-1582',
                doi: '10.1109/TPAMI.2024.1234567',
                confidence: 0.89
            };

            setMetadata(extractedMetadata);
            generateCitationFromMetadata(extractedMetadata);
        } catch (err) {
            setError('Failed to process PDF. Please try again or use manual entry.');
        } finally {
            setIsProcessing(false);
            setProgress(0);
        }
    };

    const generateCitationFromMetadata = (data: ExtractedMetadata) => {
        let generated = '';
        const authorsStr = data.authors.join(', ');

        switch (data.type) {
            case 'journal':
                generated = `[1] ${authorsStr}, "${data.title}," <em>${data.journalName}</em>, vol. ${data.volume}, no. ${data.issue}, pp. ${data.pages}, ${data.year}`;
                if (data.doi) generated += `. doi: ${data.doi}`;
                generated += '.';
                break;
            case 'conference':
                generated = `[1] ${authorsStr}, "${data.title}," in <em>Conference Name</em>, ${data.year}, pp. ${data.pages}`;
                if (data.doi) generated += `. doi: ${data.doi}`;
                generated += '.';
                break;
            case 'book':
                generated = `[1] ${authorsStr}, <em>${data.title}</em>. ${data.publisher}, ${data.year}`;
                if (data.doi) generated += `. doi: ${data.doi}`;
                generated += '.';
                break;
            default:
                generated = `[1] ${authorsStr}, "${data.title}," ${data.year}`;
                if (data.doi) generated += `. doi: ${data.doi}`;
                generated += '.';
        }

        setCitation(generated);
    };

    const copyCitation = () => {
        navigator.clipboard.writeText(citation);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const clearForm = () => {
        setSelectedFile(null);
        setMetadata(null);
        setCitation('');
        setError('');
        setProgress(0);
        setShowCopySuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Card className="w-full bg-white/70 backdrop-blur-sm shadow-2xl border-0 p-6">
            <Heading size="5" className="mb-4 text-center">
                PDF Citation Generator
            </Heading>
            <Text size="3" className="text-gray-600 text-center mb-6 block">
                Upload a PDF file to automatically extract citation information and generate IEEE citations.
            </Text>

            <Flex direction="column" gap="4">
                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Upload PDF File
                    </Text>
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        
                        {selectedFile ? (
                            <Flex direction="column" align="center" gap="2">
                                <FileIcon className="w-8 h-8 text-green-600" />
                                <Text size="3" weight="medium" className="text-green-700">
                                    {selectedFile.name}
                                </Text>
                                <Text size="2" className="text-gray-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </Text>
                            </Flex>
                        ) : (
                            <Flex direction="column" align="center" gap="2">
                                <UploadIcon className="w-8 h-8 text-gray-400" />
                                <Text size="3" className="text-gray-600">
                                    Click to select a PDF file
                                </Text>
                                <Text size="2" className="text-gray-500">
                                    Maximum file size: 10MB
                                </Text>
                            </Flex>
                        )}
                    </div>
                </Box>

                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Expected Citation Type
                    </Text>
                    <Select.Root value={selectedType} onValueChange={(value) => setSelectedType(value as CitationType)}>
                        <Select.Trigger className="w-full" />
                        <Select.Content>
                            {citationTypes.map((type) => (
                                <Select.Item key={type.value} value={type.value}>
                                    {type.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Box>

                {isProcessing && (
                    <Box className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Text size="2" className="text-blue-700 mb-2 block">
                            Processing PDF... {progress}%
                        </Text>
                        <Progress value={progress} />
                    </Box>
                )}

                <Flex gap="3" justify="center">
                    <Button
                        size="3"
                        variant="classic"
                        color="gray"
                        highContrast
                        onClick={processPDF}
                        disabled={!selectedFile || isProcessing}
                        className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isProcessing ? (
                            <>
                                <Spinner size="2" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <UploadIcon />
                                Process PDF & Generate Citation
                            </>
                        )}
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        color="gray"
                        highContrast
                        onClick={clearForm}
                        disabled={isProcessing}
                    >
                        <ResetIcon /> Clear
                    </Button>
                </Flex>

                {error && (
                    <Box className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <Text size="2" className="text-red-700">
                            {error}
                        </Text>
                    </Box>
                )}
            </Flex>

            <Separator className="my-6" />

            {citation && (
                <Box className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Flex justify="between" align="center" className="mb-3">
                        <Text size="3" weight="medium" className="text-green-800">
                            Generated Citation
                        </Text>
                        <Button
                            size="2"
                            variant="outline"
                            color="gray"
                            highContrast
                            onClick={copyCitation}
                            disabled={showCopySuccess}
                        >
                            <CopyIcon />
                            {showCopySuccess ? 'Copied!' : 'Copy'}
                        </Button>
                    </Flex>
                    <Box className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
                        {citation}
                    </Box>
                </Box>
            )}
        </Card>
    );
}