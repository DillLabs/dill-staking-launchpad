import { Action, ActionTypes } from '../actions';

export enum AcknowledgementIdsEnum {
  introSection,
  deposit,
  terminal,
  responsibilities,
  slashing,
  keyManagement,
  earlyAdoptionRisks,
  checklist,
  confirmation,
}

export type AcknowledgementStateInterface = {
  [key in AcknowledgementIdsEnum]: boolean;
};

const defaultAcknowledgementState: AcknowledgementStateInterface = {
  [AcknowledgementIdsEnum.introSection]: true,
  [AcknowledgementIdsEnum.deposit]: true,
  [AcknowledgementIdsEnum.terminal]: true,
  [AcknowledgementIdsEnum.responsibilities]: true,
  [AcknowledgementIdsEnum.slashing]: true,
  [AcknowledgementIdsEnum.keyManagement]: true,
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: true,
  [AcknowledgementIdsEnum.checklist]: true,
  [AcknowledgementIdsEnum.confirmation]: true,
};

export const acknowledgementReducer = (
  state = defaultAcknowledgementState,
  action: Action
): AcknowledgementStateInterface => {
  if (action.type === ActionTypes.updateAcknowledgementState) {
    return {
      ...state,
      ...{ [action.payload.acknowledgementId]: action.payload.value },
    };
  }
  return state;
};
