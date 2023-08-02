export function createPrompt(query: string, context: EntryWithContext[]) {
  let prompt =
    'The context that follows is pulled from a website. Respond based on the website information below, acting as an agent guiding someone through the website.\n\n' +
    'Context:\n'

  // need to make sure our prompt is not larger than max size
  prompt = prompt + context.map(c => c.context).join('\n\n---\n\n').substring(0, 3750)
  prompt = prompt + `\n\nQuestion: ${query}\nAnswer:`
  return prompt
}