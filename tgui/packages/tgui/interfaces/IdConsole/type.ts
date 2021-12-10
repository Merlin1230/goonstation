export type id ={
  access?: number[]
  registered?: string
  assignment?: string
  title?: string
  hasId: boolean
}

export type IdConsoleData = {
  modifiedId?: id
  scannedId?: id
  civillian: number[]
  engineering: number[]
  supply: number[]
  research: number[]
  security: number[]
  command: number[]
}


export enum accessNumber {
  // civillian access
  Morgue = 6,
  Maintence = 12,
  Chapel = 22,
  Tech_storage = 23,
  Bar = 25,
  Janitor_office = 26,
  Crematorium = 27,
  Kitchen = 28,
  Hyrdoponics = 35,
  Ranch = 83,
  // engineering access
  External_airlocks = 13,
  Construction = 32,
  Engineering = 40,
  Engineering_storage = 41,
  Engineering_power = 43, // not sure what this is, I'll look later
  Engine = 44,
  Mechanic_lab = 45,
  Atmosphereics = 46,
  Engineering_control = 48, // dont know what this is either
  // supply access
  Hangar = 30,
  Cargo = 31,
  Supply_console = 58,
  Mining = 50,
  Mining_shuttle = 47,
  Mining_oupost = 51,
  // research access
  Medical = 5,
  Toxins = 7,
  Toxins_storage = 8,
  Medlab = 9,
  Medical_equipment = 10,
  Research = 24,
  Robotics = 29,
  Chemistry = 33,
  Pathology = 84,
  // security access
  Security = 1,
  Brig = 2,
  Forensics_Lockers = 4,
  Maxsec = 37,
  Security_Lockers = 38,
  Firearms_carry_permit = 39,
  Contraband_handling_permit = 75,
  // command access
  Research_Director_office = 11,
  Emergency_storage = 14,
  ID_console = 15,
  AI_upload = 16,
  Teleporter = 17,
  EVA = 18,
  Bridge = 19,
  Captain_office = 20,
  Cheif_Engineer_office = 49,
  Medical_Director_office = 53,
  Head_of_Personnel_office = 55,
  Ghostdrone = 56
}

export enum accessTabKeys {
  Civillian,
  Engineering,
  Supply,
  Research,
  Security,
  Command
}
