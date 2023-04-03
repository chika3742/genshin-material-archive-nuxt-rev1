import releaseNotes from "~/assets/data/release-notes.yaml"
import {ReleaseNote} from "~/types/generated/release-notes.g"

export const getVersionText = (releaseNote: ReleaseNote) => {
  return `v${releaseNote.funcVersion}_D${releaseNote.dataVersion}`
}

export const getCurrentVersion = () => {
  const latest = releaseNotes[0]
  return `${getVersionText(latest)} (${latest.date})`
}
