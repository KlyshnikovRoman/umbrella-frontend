import path from 'path'

function relativePaths(filenames, separator = ' ') {
  return filenames.map((file) => path.relative(process.cwd(), file)).join(separator)
}

export default {
  // Проверка типов TypeScript файлов
  '**/*.(ts|tsx)': () => 'tsc --noEmit',

  // Форматирование TypeScript и JavaScript файлов
  '**/*.(ts|tsx|js)': (filenames) => [
    `next lint --fix --file ${relativePaths(filenames, ' --file ')}`,
    `prettier --write ${relativePaths(filenames)}`,
  ],

  // Форматирование MarkDown и JSON файлов
  '**/*.(md|json)': (filenames) => `prettier --write ${relativePaths(filenames)}`,
}
