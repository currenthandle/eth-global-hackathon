import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);
const roleValidator = z.union([
    z.literal('hacker'),
    z.literal('mentor'),
    z.literal('sponsor'),
]);
export const signUpUser = async (_, { email, password, role }, ctx) => {
    // console.log('ctx', Object.keys(ctx));
    // console.log(ctx.userId);
    if (!emailValidator.parse(email)) {
        throw new Error('Invalid email input');
    }
    if (!passwordValidator.parse(password)) {
        throw new Error('Invalid password input');
    }
    if (!roleValidator.parse(role)) {
        throw new Error('Invalid role input');
    }
    // check prisma db to see if the user already exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    // if the user exists, return an error
    if (user) {
        // throw new Error('User already exists');
        return {
            __typename: 'Error',
            message: 'Email already registered',
        };
    }
    // if the user doesn't exist, create the user and return the user
    else {
        // console.log('role', role);
        const user = await prisma.user.create({
            data: {
                email,
                password,
                role,
            },
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        const resp = {
            __typename: 'UserWithToken',
            user,
            token,
        };
        console.log('resp', resp);
        return resp;
    }
};
