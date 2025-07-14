import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

export const authConfig = {
  jwt: {
    secret: JWT_SECRET,
    expiresIn: "1d" as const,
  },
};
