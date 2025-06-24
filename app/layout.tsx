/** @format */

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/providers/AuthProviders';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ObserverProvider from '@/providers/ObserverProvider';

// import localFont from 'next/font/local';
// import './globals.css';

// const myFont = localFont({
// 	src: './Sora-VariableFont_wght.woff2',
// 	display: 'swap',
// });

export const metadata: Metadata = {
	title: 'Concurso Nacional de Mobiliário Urbano para São Paulo - 2025',
	description: 'Concurso Nacional de Mobiliário Urbano para São Paulo - 2025',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='pt-BR'
			suppressHydrationWarning>
			<body className={`antialiased`}>
				<AuthProvider>
					<QueryProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='light'
							enableSystem
							disableTransitionOnChange>
							<ObserverProvider>
								<Navbar />
								{children}
								<Toaster richColors />
								<Footer />
							</ObserverProvider>
						</ThemeProvider>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
