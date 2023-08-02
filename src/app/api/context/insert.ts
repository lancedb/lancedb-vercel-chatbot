import { connect, OpenAIEmbeddingFunction } from 'vectordb';
import { getDomObjects } from './scrape';
import crypto from 'crypto';

export async function createEmbeddingsTable(url: string, pages: number) {
  const db = await connect('/tmp/website-lancedb')
  // You need to provide an OpenAI API key, here we read it from the OPENAI_API_KEY environment variable
  const apiKey = process.env.OPENAI_API_KEY ?? ''

  // create hash function for table name
  const randomBytes = crypto.randomBytes(10)
  const hash = crypto.createHash('sha256').update(randomBytes).digest('hex')

  // The embedding function will create embeddings for the 'context' column
  const embedFunction = new OpenAIEmbeddingFunction('context', apiKey)
  const data = contextualize(await getDomObjects(url, pages), 5, 'link')
  const batchSize = 500;
  console.log('Vectors inserted: ', data.slice(0, Math.min(batchSize, data.length)).length)
  const tbl = await db.createTable(`website-${hash}`, data.slice(0, Math.min(batchSize, data.length)), embedFunction)
  for (var i = batchSize; i < data.length; i += batchSize) {
    await tbl.add(data.slice(i, Math.min(i + batchSize, data.length)))
  }
  return tbl.name
}

// Each article line has a small text column, we include previous lines in order to
// have more context information when creating embeddings
function contextualize(rows: Entry[], contextSize: number, groupColumn: string): EntryWithContext[] {
  const grouped: { [key: string]: any } = []
  rows.forEach(row => {
    if (!grouped[row[groupColumn]]) {
      grouped[row[groupColumn]] = []
    }
    grouped[row[groupColumn]].push(row)
  })

  const data: EntryWithContext[] = []
  Object.keys(grouped).forEach(key => {
    for (let i = 0; i < grouped[key].length; i++) {
      const start = i - contextSize > 0 ? i - contextSize : 0
      grouped[key][i].context = grouped[key].slice(start, i + 1).map((r: Entry) => r.text).join(' ')
    }
    data.push(...grouped[key])
  })
  return data
}
