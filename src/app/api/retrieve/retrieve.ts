import { connect, OpenAIEmbeddingFunction } from 'vectordb'

export async function retrieveContext(query: string, table: string) {
  const db = await connect('/tmp/website-lancedb')
  // You need to provide an OpenAI API key, here we read it from the OPENAI_API_KEY environment variable
  const apiKey = process.env.OPENAI_API_KEY ?? ''
  // The embedding function will create embeddings for the 'context' column
  const embedFunction = new OpenAIEmbeddingFunction('context', apiKey)
  const tbl = await db.openTable(table, embedFunction)
  console.log('Query: ', query)
  return await tbl
    .search(query)
    .select(['link', 'text', 'context'])
    .limit(3)
    .execute()
}