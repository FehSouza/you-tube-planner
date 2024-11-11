export const convertToSeconds = (timeStr: string) => {
  let time = timeStr.toLowerCase()
  let seconds = 0

  if (time.includes('h')) {
    seconds = parseInt(time.split('h')[0]) * 60 * 60
    time = time.split('h')[1]
  }

  if (time.includes('m')) {
    seconds = seconds + parseInt(time.split('m')[0]) * 60
    time = time.split('m')[1]
  }

  if (time.includes('s')) seconds = seconds + parseInt(time.split('s')[0])

  return seconds
}
