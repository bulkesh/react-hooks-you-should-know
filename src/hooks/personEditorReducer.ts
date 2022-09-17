import { Person } from "../types/person";

interface Metadata {
  isDirty: boolean;
  isValid: boolean;
}

interface ReducerState {
  person: Person | null;
  metadata: Metadata;
}

interface setPersonAction {
  type: "set-initial-person";
  payload: Person;
}

interface setpropertyAction {
  type: "set-property";
  payload: { name: string; value: unknown };
}

interface setpropertiesAction {
    type: 'set-properties';
    payload: Partial<Person>
}

type SomeAction = setPersonAction | setpropertyAction | setpropertiesAction;

export function personEditorReducer(
  state: ReducerState,
  action: SomeAction
): ReducerState {
 
  switch (action.type) {
    case "set-initial-person":
      return { ...state, person: action.payload };
    case "set-property":
      return {
        ...state,
        metadata: { ...state.metadata, isDirty: true },
        person: {
          ...state.person!,
          [action.payload.name]: action.payload.value,
        },
      };
      case "set-properties":
        return {
            ...state,
            metadata: {...state.metadata, isDirty: true },
            person: {...state.person!, ...action.payload },
        }

    default:
      return state;
  }
}
