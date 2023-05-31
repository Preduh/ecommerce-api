import { prismaClient } from '../src/database/prismaClient'

async function main (): Promise<void> {
  const userFind = prismaClient.user.findFirst({
    where: {
      email: process.env.DEFAULT_USER_EMAIL ?? 'dev@mail.com'
    }
  })

  if (userFind === null) {
    await prismaClient.user.create({
      data: {
        email: process.env.DEFAULT_USER_EMAIL ?? 'dev@mail.com',
        firstName: 'Pedro',
        lastName: 'Lucas',
        mobile: '38999999999',
        password: process.env.DEFAULT_USER_PASSWORD ?? '123456',
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
