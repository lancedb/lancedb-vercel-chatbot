'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function Form({ state, setState }: { state: MainState, setState: Dispatch<SetStateAction<MainState>> }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const websiteBase = state.website.split('/')[2]

  const handleWebsiteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch("/api/context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: state.website, pages: state.pages, })
    })
    if (response?.ok) {
      const table = (await response.json()).table
      setState({ ...state, chat: true, table })
    } else {
      setError('Failed to load data into LanceDB: Check the given url.')
    }
    setLoading(false)
  }
  return (
    <form className="w-full mb-5" onSubmit={handleWebsiteSubmit}>
      <div className="flex flex-col md:flex-row md:w-3/4 md:space-x-2">
        <div className="basis-1/2 w-full">
          <label htmlFor="website" className="block mb-2 text-md font-medium text-gray-900">Website sitemap</label>
          <input value={state.website}
            onChange={e => setState({ ...state, website: e.target.value })} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://nextjs.org/sitemap.xml" required />
        </div>
        <div className="basis-1/2 w-full">
          <label htmlFor="pages" className="block mb-2 text-md font-medium text-gray-900">Pages to load</label>
          <ul className="mb-2 flex justify-start md:flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {[1,3,5].map(pageNum => (
              <li key={pageNum} className="mr-2">
                <button onClick={e => {
                  e.preventDefault()
                  setState({ ...state, pages: pageNum })
                }} className={`inline-block px-4 py-3 ${state.pages == pageNum ? 'text-white bg-lancedb rounded-lg' : 'rounded-lg hover:text-gray-900 hover:bg-gray-100'}`}>
                  {pageNum} {pageNum == 1 ? 'page' : 'pages'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-2 flex flex-row  bg-blue space-x-2 items-center">
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lancedb rounded-lg hover:bg-opacity-80 focus:ring-4 focus:outline-none">
          Load and start chatting
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>

        {loading ? (
          <div className="p-2 text-sm text-lancedb rounded-lg bg-lancedb bg-opacity-10" role="alert">
            Loading {state.pages} {state.pages === 1 ? 'page': 'pages'} from {websiteBase} into LanceDB. This may take a few seconds...
          </div>
        ) : null}

        {loading ? (
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-lancedb" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        ) : null}

        {error ? (
          <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {error}
          </div>
        ) : null}
      </div>
    </form>
  )
}