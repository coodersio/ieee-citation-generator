'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flex, Text, Container, Box, Button } from '@radix-ui/themes';

const navigation = [
    { name: 'Home', href: '/', title: 'IEEE Citation Generator - Homepage' },
    { name: 'Book', href: '/book', title: 'Generate Book Citations in IEEE Format' },
    { name: 'Journal', href: '/journal', title: 'Generate Journal Article Citations in IEEE Format' },
    { name: 'Conference', href: '/conference', title: 'Generate Conference Paper Citations in IEEE Format' },
    { name: 'DOI', href: '/doi', title: 'Generate Citations from DOI Numbers' },
    { name: 'Guide', href: '/guide', title: 'IEEE Citation Style Guide and Examples' },
];

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <Box asChild>
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
                    <Container size="4" className="py-3 sm:py-4 px-4">
                        <Flex align="center" justify="between">
                            {/* Logo */}
                            <Link href="/" title="IEEE Citation Generator - Homepage" className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                    <Text size={{ initial: "3", sm: "4" }} weight="bold" className="text-white">
                                        I
                                    </Text>
                                </div>
                                <Text
                                    size={{ initial: "4", sm: "5" }}
                                    weight="bold"
                                    className="text-gray-900 hover:text-blue-600 transition-colors hidden xs:block"
                                >
                                    IEEE Citation Generator
                                </Text>
                                <Text
                                    size="4"
                                    weight="bold"
                                    className="text-gray-900 hover:text-blue-600 transition-colors block xs:hidden"
                                >
                                    IEEE Cite
                                </Text>
                            </Link>

                            {/* Desktop Navigation */}
                            <Box asChild>
                                <nav className="hidden md:block">
                                    <Flex align="center" gap="1">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href ||
                                                (item.href !== '/' && pathname.startsWith(item.href));

                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    title={item.title}
                                                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                    </Flex>
                                </nav>
                            </Box>

                            {/* Desktop CTA Button - Primary */}
                            <div className="hidden md:block">
                                <Button
                                    asChild
                                    size="2"
                                    variant="classic"
                                    color="gray"
                                    highContrast
                                    className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                                >
                                    <Link href="/book" title="Start Generating Book Citations">Start Now</Link>
                                </Button>
                            </div>

                            {/* Mobile Menu Button - 只在移动端显示 */}
                            <div className="block sm:block md:hidden lg:hidden xl:hidden mobile-menu-button">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </Flex>
                    </Container>
                </header>
            </Box>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <Box className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg mobile-menu-enter">
                        <Container size="4" className="py-4 px-4">
                            <nav>
                                <Flex direction="column" gap="1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href ||
                                            (item.href !== '/' && pathname.startsWith(item.href));

                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                title={item.title}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </Flex>

                                {/* Mobile CTA Button - Primary */}
                                <Box className="mt-4 pt-4 border-t border-gray-200">
                                    <Button
                                        asChild
                                        size="3"
                                        variant="classic"
                                        color="gray"
                                        highContrast
                                        className="w-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                                    >
                                        <Link
                                            href="/book"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Start Generating Now
                                        </Link>
                                    </Button>
                                </Box>
                            </nav>
                        </Container>
                    </Box>
                </div>
            )}
        </>
    );
}