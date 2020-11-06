export interface Filters {
  hardware: {
    Console: boolean
    Emulator: boolean
  }
  playStyle: {
    Tap: boolean
    DAS: boolean
  }
}

export interface Player {
  name: string
  score: number
  hardware: string
  playStyle: string
  proof: string
  link?: string
}
