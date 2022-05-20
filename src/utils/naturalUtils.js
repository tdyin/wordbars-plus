const natural = require('natural')
const wordnet = new natural.WordNet()

const stemmer = (word) => {
  return natural.PorterStemmer.stem(word)
}

const extractSentence = (text) => {
  return new natural.SentenceTokenizer().tokenize(text)
}

const removeWords = (query, expansion) => {
  const stopWords = new Set([
    'let',
    'make',
    'i',
    'me',
    'my',
    'myself',
    'we',
    'our',
    'ours',
    'ourselves',
    'you',
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'is',
    'isn',
    'are',
    'was',
    'wasn',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'hasn',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'would',
    'wouldn',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'shouldn',
    'now',
  ])
  for (const i of query) stopWords.add(i)
  const difference = new Set(
    new natural.AggressiveTokenizer()
      .tokenize(expansion.join(' '))
      .map((word) => word.toLowerCase())
  )
  for (const i of stopWords) difference.delete(i)
  return Array.from(difference)
}

const getSynonyms = async (query) => {
  const synonyms = []
  await Promise.all(
    query.map((word) => {
      return new Promise((resolve) => {
        wordnet.lookup(stemmer(word), (results) => {
          results.forEach((result) => {
            synonyms.push(...result.synonyms)
          })
          resolve()
        })
      })
    })
  )
  return Array.from(
    new Set(
      synonyms
        .filter((word) => !word.includes('_'))
        .map((word) => word.toLowerCase())
    )
  )
}

const extractKeywords = async (docs) => {
  const tfidf = new natural.TfIdf()
  let totalDocs = 0
  for (const text of docs) {
    tfidf.addDocument(text)
    totalDocs += 1
  }
  const allTerms = []
  for (let i = 0; i < totalDocs; i++)
    allTerms.push(
      ...tfidf
        .listTerms(i)
        .slice(0, 5) // each doc choose 5 highest
        .map((term) => term.term)
    )
  // const terms = tfidf.listTerms(0)
  const keywords = []
  await Promise.all(
    allTerms.map((term) => {
      return new Promise((resolve) => {
        wordnet.lookup(term, (results) => {
          if (
            results.some(
              (result) => result.pos === 'n' || result.pos === 'v'
            ) &&
            isNaN(term)
          ) {
            keywords.push(term)
          }
          resolve()
        })
      })
    })
  )
  return keywords
}

module.exports = {
  stemmer,
  removeWords,
  getSynonyms,
  extractSentence,
  extractKeywords,
}
