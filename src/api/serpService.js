const SerpApi = require('google-search-results-nodejs')
const { extractKeywords } = require('../utils/naturalUtils')

const params = (query) => {
  const str = query.join(' ')
  return { q: str, num: 10 }
}

const search = (query) => {
  const API_KEY =
    '50dd764f01edd7f494ac7e870bf7f6f35ed16222150e2d1f0181324290988b3d'
  const google = new SerpApi.GoogleSearch(API_KEY)
  return new Promise((resolve) => {
    google.json(params(query), (result) => {
      resolve(result)
    })
  })
}

const getSnippets = async (query) => {
  const snippets = []
  await search(query).then((results) => {
    results['organic_results'].forEach((result) =>
      // title + snippet will give better result in tfidf
      snippets.push(`${result.title}: ${result.snippet}`) 
    )
  })
  return snippets
}

const getSnippetsKeywords = async (query) => {
  let keywords = []
  await getSnippets(query).then(async (snippets) => {
    keywords = await extractKeywords(snippets)
  })
  return keywords
}

module.exports = {
  getSnippetsKeywords,
}
