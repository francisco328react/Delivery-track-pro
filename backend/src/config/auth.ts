import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET não definido no .env");
}

export default {
  jwt: {
    secret: secret as string,
    expiresIn: "1d" as const,
  },
};
