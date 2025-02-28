import { Preferences } from "@capacitor/preferences";

type Grade = 3 | 4 | 5 | 6;
export type Session = {
    date: string,
    tops: {
      [K in Grade]: number
    },
  }

// const clearStorage = () => Preferences.set({
//   key: 'sessions',
//   value: '[]'
// })
  
export const loadSessions = async () => {
    const { value } = await Preferences.get({ key: 'sessions' });
    if (value === null) {
      return []
    }
    return JSON.parse(value) as Session[]
  }


export const saveSessions = (sessions: Session[]) => Preferences.set({key: "sessions", value: JSON.stringify(sessions)})


export const deleteSession = async (index: number) => {
    const sessions = await loadSessions()
    sessions.splice(index as number, 1)
    await saveSessions(sessions)
}
