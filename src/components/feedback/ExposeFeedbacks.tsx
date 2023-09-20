"use client"

import { ExtendedFeedbackPost } from '@/types/db'
import { FC } from 'react'
import TheFeedback from './TheFeedback'

interface ExposeFeedbacksProps {
  feedbacks: ExtendedFeedbackPost[]
}

const ExposeFeedbacks: FC<ExposeFeedbacksProps> = ({feedbacks}) => {
  return (
    <section>
      <div className='flex flex-col my-2'>
        {feedbacks.map((feedback) => {
          return (
            <>
              <div className='rounded-[2vh] border border-slate-500 p-4'>
                <TheFeedback feedback={feedback} />
              </div>
            </>
          )
        })}
      </div>
    </section>
  )
}

export default ExposeFeedbacks