import {RootState} from '..';

export const getLoadingStateSelector = (state: RootState) => state.auth.loading;

export const getUserSelector = (state: RootState) => state.auth.user;

export const getGuestModeSelector = (state: RootState) => state.auth.guestMode;

export const getHasActiveSubscriptionSelector = (state: RootState) =>
  state.auth.hasActiveSub;

export const getTotalUnReadApplicationSelector = (state: RootState) =>
  state.auth.totalApplicationUnread;
