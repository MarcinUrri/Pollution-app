export const apiParameters = {
  aq: {
    https: 'https://api.openaq.org/v1/cities?',
    limit: 10,
    orderBy: 'count',
    sort: 'desc'
  },
  wiki: {
    https:'https://en.wikipedia.org/w/api.php?',
    action: 'opensearch',
    format: 'json',
  }
}