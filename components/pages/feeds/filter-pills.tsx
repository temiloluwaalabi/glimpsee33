import {motion} from "framer-motion"
import React from 'react'

import { mockCategories } from '@/config/constants/mockdata'
import { useFeedState } from '@/hooks/use-feed-state'
import { cn } from '@/lib/utils'

export default function FilterPills() {
    const {filters, setSelectedCategory} = useFeedState()
  return (
    <div className='flex flex-wrap gap-2 mb-6'>
        {
            mockCategories.map((category) => {
                const Icon = category.icon;
                const isActive = filters.category === category.id


                return (
                    <motion.button key={category.id} onClick={() => setSelectedCategory(category.id)} className={cn("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden", isActive ? "text-white shadow-lg transform scale-105" : "text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300")} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                        {
                            isActive && (
                                              <div className={`absolute inset-0 bg-gradient-to-r ${category.color}`} />

                            )
                        }
                        <div className="relative flex items-center gap-2">
                            <span>{Icon}</span>
                            {category.name}
                        </div>
                        
                         </motion.button>
                )
            })
        }
    </div>
  )
}
