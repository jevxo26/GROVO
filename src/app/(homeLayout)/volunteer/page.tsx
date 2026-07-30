// import { UserCheck } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// const page = () => {
//   return (
//     <div className='bg-blue-500'>
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 flex justify-center">
//           <div className="max-w-2xl py-10 mx-auto relative z-10 w-full flex flex-col items-center">
//             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
//               Ready to Make a <span className="text-green-500">Difference?</span>
//             </h2>
//             <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
//               Thousands of communities across Bangladesh are waiting for your help. Register today and start your journey as an ASHRAY volunteer.
//             </p>
//             <Link
//               href="#register" 
//               className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-xl transition shadow-lg shadow-green-600/30"
//             >
//               <UserCheck className="w-5 h-5" />
//               <span>Join as Volunteer</span>
//             </Link>
//           </div>
//       </div>
//       </div>
//   )
// }

// export default page


import { UserCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full bg-[#0b1f11] dark:bg-[#051108] flex items-center justify-center py-16 transition-colors duration-300'>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 flex justify-center">
        <div className="max-w-2xl py-4 mx-auto relative z-10 w-full flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Make a <span className="text-green-500">Difference?</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            Thousands of communities across Bangladesh are waiting for your help. Register today and start your journey as an ASHRAY volunteer.
          </p>
          <Link
            href="#register" 
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-xl transition shadow-lg shadow-green-600/30"
          >
            <UserCheck className="w-5 h-5" />
            <span>Join as Volunteer</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page