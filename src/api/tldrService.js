const tldr = require('wikipedia-tldr')
const { extractKeywords, extractSentence } = require('../utils/naturalUtils')

const getWiki = async (query) => {
  const str = query.join(' ')
  return tldr(str)
}

const getWikiKeywords = async (query) => {
  let text = ['']
  // If wiki has the page, get the first paragraph (the entity's summary)
  const wiki = await getWiki(query)
  // Split the paragraph in to sentences as multiple documents.
  if (wiki) text = extractSentence(wiki.extract)
  return await extractKeywords(text)
}

module.exports = {
  getWikiKeywords,
}
