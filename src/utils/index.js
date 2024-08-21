// Creating SEO-friendly slugs from a string
const slugify = (str) => {
  if (!str) return ''
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

// Validators
const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
const OBJECT_ID_RULE_MSG = 'Your string fails to match the Object Id pattern!'

// Fields is not allowed update for board
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']
const INVALID_UPDATE_FIELDS_MORE = ['_id', 'createdAt', 'boardId']

// List of domains that the server allows access to
const WHITELIST_DOMAINS = [
  'http://localhost:5173',
  'https://trello-web-fawn.vercel.app'
]

// Valid types of board
const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export {
  slugify,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MSG,
  INVALID_UPDATE_FIELDS,
  INVALID_UPDATE_FIELDS_MORE,
  WHITELIST_DOMAINS,
  BOARD_TYPES
}
