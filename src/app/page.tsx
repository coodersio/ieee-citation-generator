import Link from 'next/link';
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Card,
  Grid,
  Heading,
  Badge
} from '@radix-ui/themes';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/HeroSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "IEEE Citation Generator - Free Online Tool",
  description: "Generate perfect IEEE format citations for books, journals, conferences, websites & more. Free online tool with automatic search & formatting.",
  alternates: {
    canonical: "https://ieeecitationgenerator.com"
  }
};

const citationTypes = [
  {
    title: 'Book IEEE Citation Generator',
    description: 'Generate IEEE format citations for books, textbooks, and monographs. Perfect for academic references with proper author, title, publisher, and year formatting.',
    href: '/book',
    badge: 'Popular'
  },
  {
    title: 'Journal IEEE Citation Generator',
    description: 'Create IEEE citations for journal articles and research papers. Includes volume, issue, page numbers, and DOI formatting according to IEEE standards.',
    href: '/journal',
    badge: 'Essential'
  },
  {
    title: 'Conference IEEE Citation Generator',
    description: 'Format conference papers and proceedings in IEEE style. Handles conference names, locations, dates, and page numbers with proper IEEE formatting.',
    href: '/conference',
    badge: null
  },
  {
    title: 'Website IEEE Citation Generator',
    description: 'Generate IEEE citations for websites, online articles, and digital resources. Includes URL formatting and access dates as required by IEEE standards.',
    href: '/website',
    badge: null
  },
  {
    title: 'Standard IEEE Citation Generator',
    description: 'Create IEEE citations for technical standards and specifications. Supports IEEE, ISO, ANSI, and other standards with proper formatting.',
    href: '/standard',
    badge: null
  },
  {
    title: 'Image IEEE Citation Generator',
    description: 'Generate IEEE citations for images, photographs, and digital media. Perfect for citing visual content in academic papers.',
    href: '/image',
    badge: null
  },
];

const inputMethods = [
  {
    title: 'DOI Citation Generator',
    description: 'Enter a DOI and automatically generate IEEE citations with complete metadata.',
    href: '/doi',
  },
  {
    title: 'PDF Citation Generator',
    description: 'Upload PDF files to automatically extract citation information.',
    href: '/pdf',
  },
  {
    title: 'Manual Entry',
    description: 'Fill out detailed forms manually for complete control.',
    href: '/book', // Default to book manual entry
  },
];

const outputFormats = [
  {
    title: 'BibTeX Format',
    description: 'Export citations in BibTeX format for LaTeX documents.',
    href: '/bibtex',
  },
  {
    title: 'Plain Text',
    description: 'Get clean, formatted text citations ready to copy and paste.',
    href: '/text',
  },
  {
    title: 'Format Converter',
    description: 'Convert APA, MLA, or other formats to IEEE style.',
    href: '/convert',
  },
];

export default function Home() {
  return (
    <PageLayout showBreadcrumb={false}>
      {/* Hero Section with Integrated Tool */}
      <HeroSection isHomePage={true} />

      <Container size="4" className="py-6 sm:py-8 lg:py-12 px-4">
        {/* Ad Placeholder */}
        <Box className="text-center mb-12 sm:mb-16">
          <Card className="p-4 sm:p-6 bg-gray-50/50 border-dashed border-2 border-gray-200 rounded-xl">
            {/* <Text size={{ initial: "2", sm: "3" }} className="text-gray-500">
              Advertisement Space (728x90)
            </Text> */}
          </Card>
        </Box>

        {/* Citation Types */}
        <Box className="mb-16 sm:mb-20">
          <Box className="text-center mb-8 sm:mb-12 px-4">
            <Heading as="h2" size={{ initial: "6", sm: "7" }} className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Citation Types
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of IEEE citation generators
            </Text>
          </Box>

          <Grid columns={{ initial: '1', md: '2' }} gap="6">
            {citationTypes.map((type) => (
              <Card
                key={type.href}
                className="group p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <Flex direction="column" gap={{ initial: "3", sm: "4" }} height="100%">
                  <Flex align="center" gap="3" direction={{ initial: "column", sm: "row" }} className="text-center sm:text-left">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-xl sm:text-2xl text-blue-600">
                        {type.title.split(' ')[0] === 'Book' && '📚'}
                        {type.title.split(' ')[0] === 'Journal' && '📄'}
                        {type.title.split(' ')[0] === 'Conference' && '🎤'}
                        {type.title.split(' ')[0] === 'Website' && '🌐'}
                        {type.title.split(' ')[0] === 'Standard' && '📋'}
                        {type.title.split(' ')[0] === 'Image' && '🖼️'}
                      </span>
                    </div>
                    <Box className="flex-1">
                      <Heading as="h3" size={{ initial: "4", sm: "5" }} className="group-hover:text-blue-600 transition-colors">
                        {type.title}
                      </Heading>
                      {type.badge && (
                        <Badge color="blue" variant="soft" size="1" className="mt-1">
                          {type.badge}
                        </Badge>
                      )}
                    </Box>
                  </Flex>

                  <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed flex-1 text-center sm:text-left">
                    {type.description}
                  </Text>

                  {/* Secondary CTA - 重要的特定功能 */}
                  <Button
                    asChild
                    size={{ initial: "2", sm: "3" }}
                    variant="soft"
                    className="mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all w-full font-medium"
                  >
                    <Link href={type.href} title={`Generate ${type.title.split(' ')[0]} Citations - IEEE Format`} className="flex items-center justify-center gap-2">
                      <span className="hidden sm:inline">Generate {type.title.split(' ')[0]} Citations</span>
                      <span className="sm:hidden">Generate {type.title.split(' ')[0]}</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Content Ad */}
        {/* <Box className="text-center mb-16 sm:mb-20">
          <Card className="p-4 sm:p-6 bg-gray-50/50 border-dashed border-2 border-gray-200 rounded-xl">
            <Text size={{ initial: "2", sm: "3" }} className="text-gray-500">
              Advertisement Space (336x280)
            </Text>
          </Card>
        </Box> */}

        {/* Input Methods */}
        <Box className="mb-16 sm:mb-20">
          <Box className="text-center mb-8 sm:mb-12 px-4">
            <Heading as="h2" size={{ initial: "6", sm: "7" }} className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Input Methods
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} className="text-gray-600 max-w-2xl mx-auto">
              Multiple ways to input your citation information
            </Text>
          </Box>

          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap={{ initial: "4", sm: "6" }}>
            {inputMethods.map((method, index) => (
              <Card
                key={method.href}
                className="group p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <Flex direction="column" gap={{ initial: "3", sm: "4" }} height="100%" align="center" className="text-center">
                  <Box className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl sm:text-2xl text-indigo-600">
                      {index === 0 && '🔗'}
                      {index === 1 && '📄'}
                      {index === 2 && '✍️'}
                    </span>
                  </Box>

                  <Heading as="h3" size={{ initial: "3", sm: "4" }} className="group-hover:text-indigo-600 transition-colors">
                    {method.title}
                  </Heading>

                  <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed flex-1">
                    {method.description}
                  </Text>

                  {/* Tertiary - 辅助功能 */}
                  <Button
                    asChild
                    variant="outline"
                    color="gray"
                    highContrast
                    size={{ initial: "2", sm: "3" }}
                    className="mt-auto rounded-full w-full transition-all duration-200"
                  >
                    <Link href={method.href} title={`Use ${method.title} for Citation Input`}>
                      <span className="hidden sm:inline">Use {method.title}</span>
                      <span className="sm:hidden">Use {method.title.split(' ')[0]}</span>
                    </Link>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Output Formats */}
        <Box className="mb-16 sm:mb-20">
          <Box className="text-center mb-8 sm:mb-12 px-4">
            <Heading as="h2" size={{ initial: "6", sm: "7" }} className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Output Formats
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} className="text-gray-600 max-w-2xl mx-auto">
              Export your citations in various formats
            </Text>
          </Box>

          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap={{ initial: "4", sm: "6" }}>
            {outputFormats.map((format, index) => (
              <Card
                key={format.href}
                className="group p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <Flex direction="column" gap={{ initial: "3", sm: "4" }} height="100%" align="center" className="text-center">
                  <Box className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl sm:text-2xl text-green-600">
                      {index === 0 && '📋'}
                      {index === 1 && '📝'}
                      {index === 2 && '🔄'}
                    </span>
                  </Box>

                  <Heading as="h3" size={{ initial: "3", sm: "4" }} className="group-hover:text-green-600 transition-colors">
                    {format.title}
                  </Heading>

                  <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed flex-1">
                    {format.description}
                  </Text>

                  {/* Tertiary - 导出功能 */}
                  <Button
                    asChild
                    variant="outline"
                    color="gray"
                    highContrast
                    size={{ initial: "2", sm: "3" }}
                    className="mt-auto rounded-full w-full transition-all duration-200"
                  >
                    <Link href={format.href} title={`Export Citations in ${format.title} Format`}>
                      <span className="hidden sm:inline">Export {format.title}</span>
                      <span className="sm:hidden">Export {format.title.split(' ')[0]}</span>
                    </Link>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Features with Sidebar Ad */}
        <Box className="mb-16 sm:mb-20">
          <Box className="text-center mb-8 sm:mb-12 px-4">
            <Heading as="h2" size={{ initial: "6", sm: "7" }} className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why Choose Our IEEE Citation Generator?
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} className="text-gray-600 max-w-2xl mx-auto">
              Trusted by students, researchers, and academics worldwide
            </Text>
          </Box>

          <Grid columns={{ initial: '1', lg: '3' }} gap={{ initial: "6", sm: "8" }}>
            <Box className="lg:col-span-2">
              <Grid columns={{ initial: '1', sm: '2' }} gap={{ initial: "4", sm: "6", lg: "8" }}>
                <Card className="group p-4 sm:p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <Box className="text-center">
                    <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl sm:text-3xl text-blue-600">📚</span>
                    </Box>
                    <Heading as="h3" size={{ initial: "3", sm: "4" }} className="mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      Accurate Formatting
                    </Heading>
                    <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed">
                      Generate citations that perfectly match IEEE citation style guidelines and requirements.
                    </Text>
                  </Box>
                </Card>

                <Card className="group p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <Box className="text-center">
                    <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl sm:text-3xl text-green-600">🚀</span>
                    </Box>
                    <Heading as="h3" size={{ initial: "3", sm: "4" }} className="mb-2 sm:mb-3 group-hover:text-green-600 transition-colors">
                      Fast & Easy
                    </Heading>
                    <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed">
                      Create professional citations in seconds with our intuitive interface and smart automation.
                    </Text>
                  </Box>
                </Card>

                <Card className="group p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <Box className="text-center">
                    <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl sm:text-3xl text-purple-600">💰</span>
                    </Box>
                    <Heading as="h3" size={{ initial: "3", sm: "4" }} className="mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                      100% Free
                    </Heading>
                    <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed">
                      No registration required, no hidden fees. Generate unlimited citations completely free.
                    </Text>
                  </Box>
                </Card>

                <Card className="group p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <Box className="text-center">
                    <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl sm:text-3xl text-orange-600">📱</span>
                    </Box>
                    <Heading as="h3" size={{ initial: "3", sm: "4" }} className="mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">
                      Mobile Friendly
                    </Heading>
                    <Text size={{ initial: "2", sm: "3" }} className="text-gray-600 leading-relaxed">
                      Works perfectly on all devices - desktop, tablet, and smartphone. Generate citations anywhere.
                    </Text>
                  </Box>
                </Card>
              </Grid>
            </Box>

            {/* Sidebar Ad - Hidden on mobile */}
            {/* <Box className="hidden lg:block">
              <Card className="p-4 lg:p-6 bg-gray-50/50 border-dashed border-2 border-gray-200 rounded-xl h-64 flex items-center justify-center sticky top-24">
                <Text size="3" className="text-gray-500 text-center">
                  Advertisement Space<br />(300x250)
                </Text>
              </Card>
            </Box> */}
          </Grid>
        </Box>

        {/* Bottom Ad */}
        {/* <Box className="text-center">
          <Card className="p-6 bg-gray-50/50 border-dashed border-2 border-gray-200 rounded-xl">
            <Text size="3" className="text-gray-500">
              Advertisement Space (728x90)
            </Text>
          </Card>
        </Box> */}
      </Container>
    </PageLayout>
  );
}