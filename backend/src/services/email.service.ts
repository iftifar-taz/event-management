import createHttpError from "http-errors";
import env from "../util/validateEnv";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sendResetpasswordEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  if (!email || !resetToken) {
    throw createHttpError(400, "Parameters missing");
  }
  const resetpasswodLink = `${env.CLIENT_URL}/reset-password/${resetToken}`;
  console.log(resetpasswodLink);
  // TO:DO send email params: email, resetpasswodLink
  await delay(100);
};
