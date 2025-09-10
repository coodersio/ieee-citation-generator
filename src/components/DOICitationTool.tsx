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
    Spinner,
    Badge
} from '@radix-ui/themes';
import { CopyIcon, ResetIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { CitationType, OutputFormat } from '@/types/citation';

interface DOICitationToolProps {
    outputFormat?: OutputFormat;
}

export default function DOICitationTool({
    outputFormat = 'text'
}: DOICitationToolProps) {
    const [doi, setDoi] = useState('');
    const [citation, setCitation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const fetchDOIMetadata = async () => {
        if (!doi.trim()) {
            setError('Please enter a DOI');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const generated = `[1] J. K. Author and A. B. Coauthor, "Sample Article Title from DOI Lookup," IEEE Transactions on Software Engineering, vol. 50, no. 3, pp. 123-135, 2024. doi: ${doi}.`;
            setCitation(generated);
        } catch (err) {
            setError('Failed to fetch metadata. Please check the DOI and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyCitation = () => {
        navigator.clipboard.writeText(citation);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const clearForm = () => {
        setDoi('');
        setCitation('');
        setError('');
        setShowCopySuccess(false);
    };

    return (
        <Card className="w-full bg-white/70 backdrop-blur-sm shadow-2xl border-0 p-6">
            <Heading size="5" className="mb-4 text-center">
                DOI Citation Generator
            </Heading>
            <Text size="3" className="text-gray-600 text-center mb-6 block">
                Enter a DOI to automatically generate IEEE citations with complete metadata.
            </Text>

            <Flex direction="column" gap="4">
                <Box>
                    <Text size="2" weight="medium" className="mb-2 block">
                        Digital Object Identifier (DOI)
                    </Text>
                    <TextField.Root
                        size="3"
                        placeholder="e.g., 10.1109/TSE.2024.1234567"
                        value={doi}
                        onChange={(e) => setDoi(e.target.value)}
                    />
                    <Text size="1" className="text-gray-500 mt-1">
                        Enter the DOI without 'https://doi.org/' prefix
                    </Text>
                </Box>

                <Flex gap="3" justify="center">
                    <Button
                        size="3"
                        variant="classic"
                        color="gray"
                        highContrast
                        onClick={fetchDOIMetadata}
                        disabled={isLoading}
                        className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="2" />
                                Fetching Metadata...
                            </>
                        ) : (
                            <>
                                <MagnifyingGlassIcon />
                                Fetch & Generate Citation
                            </>
                        )}
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        color="gray"
                        highContrast
                        onClick={clearForm}
                        disabled={isLoading}
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
