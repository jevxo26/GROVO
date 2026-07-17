import React from 'react';
import { RegisterMemberForm } from '../components/RegisterMemberForm/RegisterMemberForm';

const RegisterMember = () => {
    return (
        <div className='p-6 md:p-10 space-y-8 bg-gray-50 dark:bg-[#120f0d] min-h-screen transition-colors'>
           <RegisterMemberForm></RegisterMemberForm>
        </div>
    );
};

export default RegisterMember;