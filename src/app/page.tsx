'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Form from './components/Form'
import lancedbLogo from '../../public/lancedb.svg'
import vercelLogo from '../../public/vercel.svg'

export default function Home() {
  const [data, setData] = useState('');
  const [state, setState] = useState({
    chat: false,
    pages: 1,
    website: 'https://vercel.com/sitemap.xml',
    table: '',
  })

  return (
    <main className="flex min-h-screen flex-col">
      {state.chat ? (
        <div className="flex h-full flex-grow flex-col justify-end items-center p-6 md:p-24">
          <div className="fixed top-0 py-4 text-center w-screen bg-white flex flex-row space-x-2 items-center justify-center">
            <a href="https://lancedb.com" target="_blank"><Image src={lancedbLogo} className="h-10 w-auto" alt="LanceDB logo" /></a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <a href="https://vercel.com" target="_blank"><Image src={vercelLogo} className="h-8 w-auto" alt="Vercel logo" /></a>
          </div>
          <Chat state={state} setState={setState} />
        </div>
      ) : (
        <div className="p-6 md:p-24">
          <div className="md:w-3/4">
            <div className="py-4 flex flex-row w-screen items-center space-x-3">
              <a href="https://lancedb.com" target="_blank"><Image src={lancedbLogo} className="h-5 md:h-8 w-auto" alt="LanceDB logo" /></a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <a href="https://vercel.com" target="_blank"><Image src={vercelLogo} className="h-4 md:h-6 w-auto" alt="Vercel logo" /></a>
            </div>
            <h5 className="mb-2 text-4xl md:text-8xl font-bold tracking-tight text-gray-900">AI Chatbot with <span className="text-lancedb">any website</span></h5>
            <p className="block mb-5 text-xl font-normal text-gray-700">Use an AI chatbot with website context retrieved from a vector store like LanceDB. LanceDB is lightweight and can be <b>embedded directly into <a href="https://nextjs.org" target="_blank" className="inline-flex items-center font-medium text-lancedb hover:underline">
              Next.js</a></b>, with data stored on-prem. <a href="https://github.com/lancedb/lancedb-vercel-chatbot" target="_blank" className="inline-flex items-center font-medium text-lancedb hover:underline">
                Visit chatbot repo
                <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a></p>
            <Form state={state} setState={setState} />
          </div>

          <div className="flex flex-col w-full items-center md:items-start md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <div className="md:max-w-sm p-6 h-full bg-white border border-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-500 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>

              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Gets relevant information</h5>
              <p className="font-normal text-gray-500 ">By using a vector store, we can retrieve relevant up-to-date information for use in chat completion.</p>
            </div>

            <div className="md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-500 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
              </svg>

              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Reduces hallucinations</h5>
              <p className="font-normal text-gray-500 ">By using a source of truth, we provide a structural basis for LLM answers. This is known as retrieval augmented generation.</p>
            </div>

            <div className="md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-500 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>

              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Immersive chat experience</h5>
              <p className="font-normal text-gray-500 ">The Vercel AI SDK allows for a streaming UI experience and real-time dynamic data representation with just a few lines of code.</p>
            </div>
          </div>
        </div>
      )
      }
    </main>
  )
}