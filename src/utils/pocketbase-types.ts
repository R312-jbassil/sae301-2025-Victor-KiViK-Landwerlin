export type LunettesRecord = {
	name?: string
	code_svg?: string
	chat_history?: string
	materiau?: string
	couleur?: string
	pont?: number
	taille_verres?: number
	type_verres?: string
	user?: string
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type LunettesResponse<Texpand = unknown> = Required<LunettesRecord> & BaseSystemFields<Texpand>

// Ajouter dans Collections enum
export enum Collections {
	// ... existants
	Lunettes = "lunettes",
}

// Ajouter dans CollectionRecords
export type CollectionRecords = {
	// ... existants
	lunettes: LunettesRecord
}

// Ajouter dans CollectionResponses
export type CollectionResponses = {
	// ... existants
	lunettes: LunettesResponse
}

// Ajouter dans TypedPocketBase
export type TypedPocketBase = PocketBase & {
	// ... existants
	collection(idOrName: 'lunettes'): RecordService<LunettesResponse>
}