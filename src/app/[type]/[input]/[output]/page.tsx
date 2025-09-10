import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Box, Heading, Text } from '@radix-ui/themes';
import PageLayout from '@/components/PageLayout';
import BookCitationTool from '@/components/BookCitationTool';
import { CitationType, InputMethod, OutputFormat } from '@/types/citation';

interface PageProps {
    params: Promise<{
        type: CitationType;
        input: InputMethod;
        output: OutputFormat;
    }>;
}

const validTypes: CitationType[] = ['book', 'journal', 'conference', 'website', 'standard', 'image'];
const validInputs: InputMethod[] = ['manual', 'doi', 'pdf'];
const validOutputs: OutputFormat[] = ['text', 'bibtex', 'latex'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { type, input, output } = await params;

    if (!validTypes.includes(type) || !validInputs.includes(input) || !validOutputs.includes(output)) {
        return {
            title: 'Page Not Found',
        };
    }

    const title = `${type.charAt(0).toUpperCase() + type.slice(1)} IEEE Citation Generator - ${input.toUpperCase()} to ${output.toUpperCase()}`;
    const description = `Generate IEEE ${type} citations using ${input} input method and export in ${output} format. Professional citation tool for academic research.`;
    const keywords = `${type} ieee citation ${input} ${output}, ieee ${type} citation generator, ${input} to ${output} citation converter`;

    return {
        title: `${title} | IEEE Citation Generator`,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    const params = [];

    for (const type of validTypes) {
        for (const input of validInputs) {
            for (const output of validOutputs) {
                params.push({ type, input, output });
            }
        }
    }

    return params;
}

export default async function TypeInputOutputPage({ params }: PageProps) {
    const { type, input, output } = await params;

    if (!validTypes.includes(type) || !validInputs.includes(input) || !validOutputs.includes(output)) {
        notFound();
    }

    const title = `${type.charAt(0).toUpperCase() + type.slice(1)} IEEE Citation Generator`;
    const subtitle = `${input.toUpperCase()} Input → ${output.toUpperCase()} Output`;
    const description = `Generate IEEE ${type} citations using ${input} input method and export in ${output} format. Perfect for academic research and professional documentation.`;

    return (
        <PageLayout>
            <Container size="4" className="py-8">
                {/* Page Header */}
                <Box className="text-center mb-8">
                    <Heading size="8" className="mb-2">
                        {title}
                    </Heading>
                    <Text size="4" className="text-blue-600 font-medium mb-4">
                        {subtitle}
                    </Text>
                    <Text size="4" className="text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </Text>
                </Box>

                {/* Method and Format Info */}
                <Box className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Box>
                            <Heading size="4" className="mb-2 text-blue-800">
                                Input Method: {input.toUpperCase()}
                            </Heading>
                            <Text size="3" className="text-blue-700">
                                {input === 'manual' && 'Fill out detailed forms manually for complete control over citation accuracy.'}
                                {input === 'doi' && 'Enter DOI numbers to automatically populate citation information from academic databases.'}
                                {input === 'pdf' && 'Upload PDF files to extract citation information automatically using advanced parsing.'}
                            </Text>
                        </Box>

                        <Box>
                            <Heading size="4" className="mb-2 text-blue-800">
                                Output Format: {output.toUpperCase()}
                            </Heading>
                            <Text size="3" className="text-blue-700">
                                {output === 'text' && 'Generate clean, formatted text citations ready to copy and paste into documents.'}
                                {output === 'bibtex' && 'Export citations in BibTeX format for use with LaTeX documents and reference managers.'}
                                {output === 'latex' && 'Generate LaTeX-formatted citations for direct use in LaTeX documents.'}
                            </Text>
                        </Box>
                    </div>
                </Box>

                {/* Citation Tool */}
                <Box className="mb-12">
                    {type === 'book' && (
                        <BookCitationTool inputMethod={input} outputFormat={output} />
                    )}
                    {type !== 'book' && (
                        <Box className="text-center p-8 bg-gray-50 rounded-lg border">
                            <Heading size="5" className="mb-4">
                                {title} - {subtitle}
                            </Heading>
                            <Text size="3" className="text-gray-600 mb-6">
                                This specific citation type is currently under development. Our book citation generator
                                supports all input methods and output formats as a reference implementation.
                            </Text>
                            <Text size="2" className="text-gray-500">
                                Coming soon: Full support for {type} citations with {input} input and {output} output.
                            </Text>
                        </Box>
                    )}
                </Box>

                {/* Format Examples */}
                <Box className="p-6 bg-gray-50 rounded-lg">
                    <Heading size="4" className="mb-4">
                        Expected Output Format: {output.toUpperCase()}
                    </Heading>

                    <Box className="space-y-4">
                        {output === 'text' && (
                            <Box>
                                <Text size="3" weight="medium" className="block mb-2">IEEE Text Format Example:</Text>
                                <Box className="p-3 bg-white rounded border font-mono text-sm">
                                    [1] J. Smith, &ldquo;Example Book Title,&rdquo; 2nd ed. New York: Publisher, 2024.
                                </Box>
                            </Box>
                        )}

                        {output === 'bibtex' && (
                            <Box>
                                <Text size="3" weight="medium" className="block mb-2">BibTeX Format Example:</Text>
                                <Box className="p-3 bg-white rounded border font-mono text-sm whitespace-pre">
                                    {`@book{smith2024,
  author = {John Smith},
  title = {Example Book Title},
  edition = {2nd},
  publisher = {Publisher},
  address = {New York},
  year = {2024}
}`}
                                </Box>
                            </Box>
                        )}

                        {output === 'latex' && (
                            <Box>
                                <Text size="3" weight="medium" className="block mb-2">LaTeX Format Example:</Text>
                                <Box className="p-3 bg-white rounded border font-mono text-sm whitespace-pre">
                                    {`\\bibitem{smith2024}
J. Smith, \\textit{Example Book Title}, 2nd ed.
New York: Publisher, 2024.`}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </PageLayout>
    );
}
