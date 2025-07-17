import { string, z } from 'zod';

export const loginSchema = z.object({
    username: z.string({
        error: (issue) => issue.input === undefined ? "Username wajib diisi" : ""
    }).min(3, {error: "Username minimal 3 karakter"}),
    password: z.string({
        error: (issue) => issue.input === undefined ? "Password wajib diisi" : ""
    }).min(6, {error: "Password minimal 6 karakter"})
})