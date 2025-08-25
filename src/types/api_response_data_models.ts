export type TValidateLoginDetailResponse = {
  success: boolean;
  message: string;
  responseData: TValidateLoginDetailData;
};

export type TValidateLoginDetailData = {
  userId: string;
  userEmail: string;
  userPassword?: string;
  token: string;
  providerId: string;
  // refreshToken: string;
};

export type TApiSuccessResponse = {
  success: boolean;
  message: string;
};
