import { redirect } from 'next/navigation';
import { FC } from 'react';

const Page: FC = () => {
  redirect('/events');
}

export default Page;
