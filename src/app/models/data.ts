interface Entry {
  [x: string]: any
  link: string
  text: string
}

interface EntryWithContext {
  [x: string]: any
  link: string
  text: string
  context: string
}