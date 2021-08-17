import { ActionType } from "./actionType";

export interface LocationType {
    id: number,
    lat: number,
    lng: number,
    name: string,
    type: PlaceType,
    image: any | null
}

export enum PlaceType {
    Business = 'Business',
    Home = 'Home',
    School = 'School'
}

export const AddLocation = (payload: LocationType) => ({
    type: ActionType.ADD_LOCATION,
    payload: payload
})
export const EditLocation = (payload: LocationType) => ({
    type: ActionType.EDIT_LOCATION,
    payload: payload
})

export const SetSelectedLocation = (payload: LocationType) => ({
    type: ActionType.SET_SELECTED_LOCATION,
    payload: payload
})