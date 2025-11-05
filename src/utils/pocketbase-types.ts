/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Lunettes = "lunettes",
	Users = "users",
}

// Base types
type IsoDateString = string;

export type BaseSystemFields<T = never> = {
	id: string;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

// Lunettes Record
export type LunettesRecord = {
	nom?: string;
	materiau?: string;
	couleur?: string;
	pont?: number;
	verres?: number;
	type_verre?: string;
	svg_data?: string;
	prix?: number;
	user?: string;
};

export type LunettesResponse<Texpand = unknown> = Required<LunettesRecord> & BaseSystemFields<Texpand>;

// Users Record
export type UsersRecord = {
	name?: string;
	avatar?: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
};

export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & BaseSystemFields<Texpand>;

// Collection Records & Responses
export type CollectionRecords = {
	lunettes: LunettesRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	lunettes: LunettesResponse;
	users: UsersResponse;
};

// Typed PocketBase
export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'lunettes'): RecordService<LunettesResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: string): RecordService;
};