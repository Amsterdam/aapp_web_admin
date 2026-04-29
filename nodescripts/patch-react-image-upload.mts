// To fix the typing of the application insights npm package
// Open PR: https://github.com/microsoft/applicationinsights-react-native/pull/50
// When this PR is merged and this package is updated then this can be removed
import fs from 'fs'
import path from 'path'

// Path to the JSON filea
const filePath = path.join(
  process.cwd(),
  'node_modules/react-image-upload/package.json',
)

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)

    return
  }

  // Parse the JSON data
  let jsonData

  try {
    jsonData = JSON.parse(data)
  } catch (err1) {
    console.error('Error parsing JSON data:', err1)

    return
  }

  // Replace the code
  jsonData.exports['.'] = {
    import: './dist/index.es.js',
    types: './dist/index.d.ts',
    require: './dist/index.umd.js',
  }

  // Convert the updated JSON object back to a string
  const updatedData = JSON.stringify(jsonData, null, 2)

  // Write the updated JSON back to the file
  fs.writeFile(filePath, updatedData, 'utf8', err2 => {
    if (err2) {
      console.error('Error writing the file:', err2)

      return
    }

    console.log(
      './node_modules/react-image-upload/package.json has been updated successfully.',
    )
  })
})
