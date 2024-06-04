import * as React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

export interface IFooterProps {
}

export default function Footer (props: IFooterProps) {
  return (
    <div>
        <div className='p-16 text-white text-sm mt-72 pt-72'>
        <div className='flex pl-52 pb-5'>
            <div className='pr-3 cursor-pointer'><InstagramIcon /></div>
            <div className='pr-3 cursor-pointer'><XIcon /></div>
            <div className='pr-3 cursor-pointer'><FacebookIcon /></div>
        </div>
            <div className='flex justify-around'>
            <div>
                <p className='pb-2'>Audio Description</p>
                <p className='pb-2'>Privacy</p>
                <p className='pb-2'>Legal Notices</p>
            </div>
            <div>
                <p className='pb-2'>Help Center</p>
                <p className='pb-2'>Jobs</p>
                <p className='pb-2'>Cookie Preferences</p>
            </div>
            <div>
                <p className='pb-2'>Media Center</p>
                <p className='pb-2'>Privacy</p>
                <p className='pb-2'>Contact Us</p>
            </div>

            </div>
                <p className='pt-5 pl-52'>1997-2024 Netflix, Inc.</p>
        </div>
    </div>
  );
}
