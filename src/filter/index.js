import momentJS from 'moment'

export function moment (value, formatString) {
  formatString = formatString || 'MM-DD HH:mm:ss'
  return momentJS(value).format(formatString)
}
export function momentWithYear (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return momentJS(value).format(formatString)
}
