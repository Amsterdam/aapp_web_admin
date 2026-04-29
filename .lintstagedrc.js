module.exports = {
  '*.(js|jsx|ts|tsx|json)': 'npx oxlint --fix',
  '*.(js|jsx|ts|tsx|json|md|yml|yaml|css)': 'npx oxfmt',
}
