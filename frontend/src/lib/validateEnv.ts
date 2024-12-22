import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

export default cleanEnv(import.meta.env, {
  VITE_API_URL: str(),
  VITE_AUTHORIZED_EMAILS: str(),
});
