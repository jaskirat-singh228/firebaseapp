import {TApiSuccessResponse} from 'types/api_response_data_models';
import {BASE_URL, PAGE_SIZE} from 'utilities/constants';
import {axiosInstance} from './api_client';
import {GET_RECEPIES, SAVE_USER_FCM_TOKEN} from './api_urls';

const axiosApiInstance = axiosInstance(BASE_URL);

export const getRecipes = async (page: number = 1) => {
  const response = await axiosApiInstance.get(GET_RECEPIES, {
    params: {
      from: page === 1 ? 1 : PAGE_SIZE * page - PAGE_SIZE,
      size: PAGE_SIZE,
    },
  });

  return response.data;
};

export const saveUserFCMToken = async (FCMToken: string) => {
  const response = await axiosApiInstance.post<TApiSuccessResponse>(
    SAVE_USER_FCM_TOKEN,
    {
      FCMToken,
    },
  );
  return response.data;
};
