// At the top of your file, or in a separate .d.ts file:
import { User } from "../../generated/prisma";

declare global {
    namespace Express {
      interface Request {
        user?: {
          id: number;
          username: string;
          role: 'SUPERADMIN' | 'ADMIN' | 'MAHASISWA' | 'DOSEN';
        }
      }
    }
  }