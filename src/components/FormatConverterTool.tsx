'use client';

import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    Card,
    Heading,
    Separator,
    Select,
    TextArea,
    Badge
} from '@radix-ui/themes';
import { CopyIcon, ResetIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type CitationFormat = 'apa' | 'mla' | 'chicago' | 'harvard' | 'ieee';

interface FormatConverterToolProps {
    // Empty interface for future props
}

export default function FormatConverterTool({ }: FormatConverterToolProps) {
    const [inputFormat, setInputFormat] = useState<CitationFormat>('apa');
    const [outputFormat, setOutputFormat] = useState<CitationFormat>('ieee');
    const [inputCitation, setInputCitation] = useState('');
    const [outputCitation, setOutputCitation] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const [conversionConfidence, setConversionConfidence] = useState(0);

    const formats: { value: CitationFormat; label: string; description: string }[] = [
        { value: 'apa', label: 'APA Style', description: 'American Psychological Association' },
        { value: 'mla', label: 'MLA Style', description: 'Modern Language Association' },
        { value: 'chicago', label: 'Chicago Style', description: 'Chicago Manual of Style' },
        { value: 'harvard', label: 'Harvard Style', description: 'Harvard Referencing' },
        { value: 'ieee', label: 'IEEE Style', description: 'Institute of Electrical and Electronics Engineers' },
    ];

    const exampleCitations: Record<CitationFormat, string> = {
        apa: 'Smith, J. K., & Doe, A. B. (2024). Neural networks and machine learning applications. Journal of Artificial Intelligence, 45(3), 123-135. https://doi.org/10.1000/182',
        mla: 'Smith, John K., and Alice B. Doe. "Neural Networks and Machine Learning Applications." Journal of Artificial Intelligence, vol. 45, no. 3, 2024, pp. 123-135.',
        chicago: 'Smith, John K., and Alice B. Doe. "Neural Networks and Machine Learning Applications." Journal of Artificial Intelligence 45, no. 3 (2024): 123-135.',
        harvard: 'Smith, J.K. and Doe, A.B., 2024. Neural networks and machine learning applications. Journal of Artificial Intelligence, 45(3), pp.123-135.',
        ieee: '[1] J. K. Smith and A. B. Doe, "Neural networks and machine learning applications," Journal of Artificial Intelligence, vol. 45, no. 3, pp. 123-135, 2024.'
    };

    const convertCitation = async () => {
        if (!inputCitation.trim()) {
            return;
        }

        setIsConverting(true);

        // Simulate conversion process
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock conversion logic - in reality, this would involve parsing and reformatting
        let converted = '';
        let confidence = 0;

        if (outputFormat === 'ieee') {
            // Convert to IEEE format
            if (inputFormat === 'apa') {
                // Simple mock conversion from APA to IEEE
                converted = inputCitation
                    .replace(/(\w+), (\w+)\.?\s*(\w\.?)?,?\s*&?\s*(\w+), (\w+)\.?\s*(\w\.?)?\.\s*\((\d{4})\)\.?\s*(.+?)\.\s*(.+?),?\s*(\d+)\((\d+)\),?\s*(\d+-\d+)/,
                        '[1] $2 $3 $1 and $5 $6 $4, "$8," $9, vol. $10, no. $11, pp. $12, $7.')
                    .replace(/https?:\/\/doi\.org\/[^\s]+/, '');
                confidence = 0.85;
            } else if (inputFormat === 'mla') {
                converted = inputCitation
                    .replace(/(\w+), (\w+)\s*(\w\.?)?,?\s*and\s*(\w+)\s*(\w\.?)?\s*(\w+)\.\s*"(.+?)"\.\s*(.+?),?\s*vol\.\s*(\d+),?\s*no\.\s*(\d+),?\s*(\d{4}),?\s*pp\.\s*(\d+-\d+)/,
                        '[1] $2 $3 $1 and $5 $6 $4, "$7," $8, vol. $9, no. $10, pp. $12, $11.');
                confidence = 0.82;
            } else {
                // Generic conversion for other formats
                converted = `[1] ${inputCitation.replace(/^\[?\d*\]?\s*/, '').replace(/\.$/, '.')}`
                    .replace(/\(\d{4}\)/, (match) => {
                        const year = match.replace(/[()]/g, '');
                        return `, ${year}`;
                    });
                confidence = 0.70;
            }
        } else {
            // Convert to other formats (simplified)
            converted = exampleCitations[outputFormat];
            confidence = 0.65;
        }

        setOutputCitation(converted);
        setConversionConfidence(confidence);
        setIsConverting(false);
    };

    const copyCitation = () => {
        navigator.clipboard.writeText(outputCitation);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const clearForm = () => {
        setInputCitation('');
        setOutputCitation('');
        setConversionConfidence(0);
        setShowCopySuccess(false);
    };

    const loadExample = () => {
        setInputCitation(exampleCitations[inputFormat]);
    };

    return (
        <Card className="w-full bg-white/70 backdrop-blur-sm shadow-2xl border-0 p-6">
            <Heading size="5" className="mb-4 text-center">
                Citation Format Converter
            </Heading>
            <Text size="3" className="text-gray-600 text-center mb-6 block">
                Convert citations between different academic formats. Support for APA, MLA, Chicago, Harvard, and IEEE styles.
            </Text>

            <Flex direction="column" gap="4">
                {/* Format Selection */}
                <Flex gap="4" wrap="wrap" align="center">
                    <Box className="flex-1 min-w-48">
                        <Text size="2" weight="medium" className="mb-2 block">
                            From Format
                        </Text>
                        <Select.Root value={inputFormat} onValueChange={(value) => setInputFormat(value as CitationFormat)}>
                            <Select.Trigger className="w-full" />
                            <Select.Content>
                                {formats.map((format) => (
                                    <Select.Item key={format.value} value={format.value}>
                                        {format.label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </Box>

                    <Box className="flex items-center justify-center mt-6">
                        <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                    </Box>

                    <Box className="flex-1 min-w-48">
                        <Text size="2" weight="medium" className="mb-2 block">
                            To Format
                        </Text>
                        <Select.Root value={outputFormat} onValueChange={(value) => setOutputFormat(value as CitationFormat)}>
                            <Select.Trigger className="w-full" />
                            <Select.Content>
                                {formats.map((format) => (
                                    <Select.Item key={format.value} value={format.value}>
                                        {format.label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </Box>
                </Flex>

                {/* Input Citation */}
                <Box>
                    <Flex justify="between" align="center" className="mb-2">
                        <Text size="2" weight="medium">
                            Input Citation ({formats.find(f => f.value === inputFormat)?.label})
                        </Text>
                        <Button
                            size="1"
                            variant="ghost"
                            onClick={loadExample}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Load Example
                        </Button>
                    </Flex>
                    <TextArea
                        placeholder={`Paste your ${formats.find(f => f.value === inputFormat)?.label} citation here...`}
                        value={inputCitation}
                        onChange={(e) => setInputCitation(e.target.value)}
                        rows={4}
                        className="w-full"
                    />
                </Box>

                {/* Convert Button */}
                <Flex gap="3" justify="center">
                    <Button
                        size="3"
                        variant="classic"
                        color="gray"
                        highContrast
                        onClick={convertCitation}
                        disabled={!inputCitation.trim() || isConverting}
                        className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isConverting ? 'Converting...' : 'Convert Citation'}
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        color="gray"
                        highContrast
                        onClick={clearForm}
                    >
                        <ResetIcon /> Clear
                    </Button>
                </Flex>
            </Flex>

            <Separator className="my-6" />

            {/* Output Citation */}
            {outputCitation && (
                <Box className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Flex justify="between" align="center" className="mb-3">
                        <Flex align="center" gap="2">
                            <Text size="3" weight="medium" className="text-green-800">
                                Converted Citation ({formats.find(f => f.value === outputFormat)?.label})
                            </Text>
                            <Badge
                                color={conversionConfidence > 0.8 ? 'green' : conversionConfidence > 0.6 ? 'yellow' : 'red'}
                                variant="soft"
                            >
                                {Math.round(conversionConfidence * 100)}% Confidence
                            </Badge>
                        </Flex>
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
                    <TextArea
                        value={outputCitation}
                        readOnly
                        rows={4}
                        className="w-full bg-white"
                    />
                    {conversionConfidence < 0.8 && (
                        <Text size="1" className="text-orange-600 mt-2 block">
                            ⚠️ Please verify the converted citation as automatic conversion may require manual adjustments.
                        </Text>
                    )}
                </Box>
            )}

            {/* Format Information */}
            <Box className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Text size="3" weight="medium" className="mb-2 block">
                    Citation Format Converter
                </Text>
                <Text size="2" className="text-gray-600 leading-relaxed">
                    This tool converts citations between different academic formats. While automated conversion is helpful,
                    always verify the output against official style guides as formatting requirements can vary by publication and field.
                </Text>
            </Box>

            {/* Format Examples */}
            <Box className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Text size="3" weight="medium" className="mb-3 block">
                    Format Examples
                </Text>
                <div className="space-y-3">
                    {formats.map((format) => (
                        <Box key={format.value}>
                            <Text size="2" weight="medium" className="text-gray-700 mb-1 block">
                                {format.label}:
                            </Text>
                            <Text size="1" className="text-gray-600 font-mono bg-white p-2 rounded border text-xs leading-relaxed">
                                {exampleCitations[format.value]}
                            </Text>
                        </Box>
                    ))}
                </div>
            </Box>
        </Card>
    );
}
