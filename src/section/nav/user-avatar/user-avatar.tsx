// import prisma from '@/lib/prisma';
// import { Session } from 'next-auth';
// import Link from 'next/link';
// import User from './user';

// type UserAvatarProps = {
//   session: Session | null;
// };

// const UserAvatar = async ({ session }: UserAvatarProps) => {
//   if (!session || !session.user.userId)
//     return (
//       <div>
//         <Link
//           href='/auth/login'
//           className='rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800'
//         >
//           ورود / ثبت نام
//         </Link>
//       </div>
//     );

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.userId,
//     },
//   });

//   return <User name={user?.name as string} />;
// };

// export default UserAvatar;
