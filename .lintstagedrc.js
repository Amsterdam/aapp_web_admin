module.exports = {
  '*.(js|jsx|ts|tsx|json)': 'npx oxlint --fix',
  '!(*package-lock).(js|jsx|ts|tsx|json|md|yml|yaml|css)': 'npx oxfmt',
}
