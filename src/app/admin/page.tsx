// import AdminPostList from '@/section/admin/admin-post-list';
// import NewPostForm from '@/section/admin/new-post-form';
// import Container from '@/section/ui/container';
// import { authOption } from '@/lib/next-auth';
// import { getServerSession } from 'next-auth';

// const admin = async () => {
//   const session = await getServerSession(authOption);

//   if (!session || session?.user.userRole !== 'ADMIN')
//     return (
//       <div className='flex h-96 flex-col items-center justify-center'>
//         دسترسی غیر مجاز
//       </div>
//     );

//   return (
//     <div>
//       <Container className='mt-8 flex flex-col gap-x-10 md:flex-row'>
//         <div className='w-full p-2'>
//           <NewPostForm />
//         </div>
//         <div className='my-5 block border-b shadow-md md:hidden'></div>
//         <div className='w-full p-2 md:h-96 md:overflow-y-auto'>
//           <AdminPostList />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default admin;

const page = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export default page;