import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Head>
      <title>Scan QR Code to Get Started</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <h1 className="text-5xl font-bold mb-8">Scan QR Code to Get Started</h1>
      <p className="text-lg text-gray-700 mb-8">
        To access the hospital directions, please scan the QR code located on the hospital kiosk with your smartphone camera.
      </p>

      <p className="text-lg text-gray-700">
        Note: This app requires a camera to be enabled on your smartphone to scan QR codes.
      </p>
    </main>
  </div>
  )
}
