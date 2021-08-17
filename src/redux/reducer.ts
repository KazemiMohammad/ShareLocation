import { ActionType } from "./actionType";
import { LocationType } from './action'
const InitialState = {
    locations: [] as LocationType[],
    selectedLocation: {
        lat: 51.505,
        lng: -0.09,
    } as LocationType
}
export type LocationStateType = typeof InitialState;

const LoactionReducer = (state: any = InitialState, action: any) => {
    switch (action.type) {
        case ActionType.ADD_LOCATION:
            return { ...state, locations: [...state.locations, { ...action.payload, id: Math.floor(Math.random() * 1000) }] };

        case ActionType.EDIT_LOCATION:
            return { ...state, locations: [...state.locations.filter((location: LocationType) => { return location.id !== action.payload.id }), action.payload] };

        case ActionType.SET_SELECTED_LOCATION:
            return { ...state, selectedLocation: action.payload };

        default:
            return state;
    }
}

export default LoactionReducer;