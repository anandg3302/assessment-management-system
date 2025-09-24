import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Add a default user (for testing)
const users: { username: string; passwordHash: string }[] = [];

(async () => {
  const defaultHash = await bcrypt.hash("admin123", 10);
  users.push({ username: "admin", passwordHash: defaultHash });
})();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash: hashedPassword });
  res.json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, "secretkey", { expiresIn: "1h" });
  res.json({ token });
};
