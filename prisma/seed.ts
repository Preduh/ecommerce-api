import { bcryptConfig } from '../src/config/bcrypt.config'
import { prismaClient } from '../src/database/prismaClient'
import bcrypt from 'bcrypt'

async function main (): Promise<void> {
  const userFind = await prismaClient.user.findFirst({
    where: {
      email: process.env.DEFAULT_USER_EMAIL ?? 'dev@mail.com'
    }
  })

  if (userFind === null) {
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD ?? '123456', bcryptConfig.saltRounds)

    await prismaClient.user.create({
      data: {
        email: process.env.DEFAULT_USER_EMAIL ?? 'dev@mail.com',
        firstName: 'dev',
        lastName: 'dev',
        mobile: '(99) 9 9999-9999',
        password: hashedPassword,
        role: 'admin'
      }
    })
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
